import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AtpCoreService } from '../atp-core.service';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {

  _ref: any;
  public subject: any = null;
  public activeModal = false;
  public timerElement: any;
  public clockObject: Array<any>;
  public isClicked: boolean;
  public clockType: 'minute' | 'hour' = 'hour';
  public hour: any = 12;
  public minute: any = 0;
  public ampm: 'AM' | 'PM' = 'AM';
  public nowTime: any = this.hour;
  public degree: any;
  public config: any;
  public appRef: any;
  public isPopup = true;
  public allowed: any;

  constructor(
    private core: AtpCoreService
  ) { }

  public ParseStringToTime (time: string): void {
    time = (time === '' || time === undefined || time === null) ? this.hour + ':' + this.minute : time;
    const itime = this.core.StringToTime(time);
    this.hour = itime.hour;
    this.minute = itime.minute;
    this.ampm = itime.ampm;
  }

  public GetTime () {
    const time = this.core.TimeToString({
      ampm: this.ampm,
      hour: this.hour,
      minute: this.minute
    });
    this.subject.next(time);
  }

  clockMaker = () => {
    const type = this.clockType;
    this.clockObject = this.core.ClockMaker(type);
    this.setArrow(null);
  }

  setActiveTime = () => {
    this.nowTime = (this.clockType === 'minute' ? this.minute : this.hour);
  }

  setArrow = (obj: any) => {
    if (obj) {
      this.clockType = obj.type;
      if (this.clockType === 'minute') {
        this.minute = obj.time;
      } else {
        this.hour = obj.time;
      }
    }
    const step = (this.clockType === 'minute') ? 6 : 30;
    const time = (this.clockType === 'minute') ? this.minute : this.hour;
    const degrees = time * step;
    this.rotationClass(degrees);
    this.setActiveTime();
  }

  rotationClass = (degrees: any) => {
    this.degree = degrees;
  }

  getDegree = (ele: any) => {
    const step = this.clockType === 'minute' ? 6 : 30;
    const parrentPos = ele.currentTarget.getBoundingClientRect();
    if (this.isClicked && (ele.currentTarget === ele.target || ele.target.nodeName === 'BUTTON')) {
      const clock = {
        width: ele.currentTarget.offsetWidth,
        height: ele.currentTarget.offsetHeight
      };
      const degrees = this.core.CalcDegrees(ele, parrentPos, step);
      let hour = this.hour,
          minute = this.minute;

      if (this.clockType === 'hour') {
        hour = (degrees / step);
        hour = (hour > 12) ? hour - 12 : hour;
      } else if (this.clockType === 'minute') {
        minute = (degrees / step);
        minute = (minute > 59) ? minute - 60 : minute;
      }

      const min = this.config.rangeTime.start,
            max = this.config.rangeTime.end;

      const nowMinHour = +min.split(':')[0] < 12 ? +min.split(':')[0] : +min.split(':')[0] - 12;
      const nowMaxHour = +max.split(':')[0] < 12 ? +max.split(':')[0] : +max.split(':')[0] - 12;
      const nowMinMin = +min.split(':')[1];
      const nowMaxMin = +max.split(':')[1];

      const Hour = (hour === 12 && this.ampm === 'AM') ? '0' : hour;
      const nowTime = Hour + ':' + minute + ' ' + this.ampm;
      if (this.allowed.indexOf(nowTime) > -1) {
        this.hour = hour;
        this.minute = minute;
        this.rotationClass(degrees);
        this.setActiveTime();
      }else if (this.clockType === 'hour' && (hour === nowMinHour && minute <= nowMinMin)) {
        this.hour = nowMinHour;
        this.minute = nowMinMin;
      }else if (this.clockType === 'hour' && (hour === nowMaxHour && minute >= nowMaxMin)) {
        this.hour = nowMaxHour;
        this.minute = nowMaxMin;
      }
    }
  }

  checkBet() {
    const Hour = (this.hour === 12 && this.ampm === 'AM') ? '0' : this.hour;
      const nowTime = Hour + ':' + this.minute + ' ' + this.ampm;
      if (this.allowed.indexOf(nowTime) === -1) {
        this.ParseStringToTime(this.config.rangeTime.start);
        this.setArrow(null);
        this.setActiveTime();
      }
  }

  modalAnimation() {
    setTimeout(() => {
      this.activeModal = true;
    }, 1);
  }

  ngOnInit() {
    this.allowed = this.core.allowedTimes (this.config.rangeTime.start, this.config.rangeTime.end);
    this.clockMaker();
    this.modalAnimation();
  }

  Close(e: any) {
    if (e.target === e.currentTarget) {
      if (this.isPopup === true) {
        this.activeModal = false;
        setTimeout(() => {
          this.appRef.detachView(this._ref.hostView);
          this._ref.destroy();
        }, 400);
      }
    }
  }
}
