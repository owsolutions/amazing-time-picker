import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IClockNumber, IDisplayPreference } from '../definitions';
import { AtpCoreService } from '../atp-core.service';
import { ITime } from '../definitions';

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
  public time: ITime = {
    ampm: 'AM',
    minute: 0,
    hour: 12
  };
  public nowTime: any = this.time.hour;
  public degree: any;
  public config: any;
  public appRef: any;
  public isPopup = true;
  public allowed: any;
  private preference: IDisplayPreference;


  constructor(
    private core: AtpCoreService
  ) { }

  public ParseStringToTime (time: string): void {
    time = (time === '' || time === undefined || time === null) ? this.time.hour + ':' + this.time.minute : time;
    this.time = this.core.StringToTime(time);
  }

  public GetTime () {
    const time = this.core.TimeToString(this.time);
    this.subject.next(time);
  }

  clockMaker = () => {
    const type = this.clockType;
    this.clockObject = this.core.ClockMaker(type);
    this.setArrow(null);
  }

  setActiveTime = () => {
    this.nowTime = (this.clockType === 'minute' ? this.time.minute : this.time.hour);
  }

  setArrow = (obj: any) => {
    if (obj) {
      this.clockType = obj.type;
      if (this.clockType === 'minute') {
        this.time.minute = obj.time;
      } else {
        this.time.hour = obj.time;
      }
    }
    const step = (this.clockType === 'minute') ? 6 : 30;
    const time = (this.clockType === 'minute') ? this.time.minute : this.time.hour;
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
      let hour = this.time.hour,
          minute = this.time.minute;

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

      const nowTime = this.GetNowTime(hour, this.time.ampm, minute);
      if (this.allowed.indexOf(nowTime) > -1) {
        this.time.hour = hour;
        this.time.minute = minute;
        this.rotationClass(degrees);
        this.setActiveTime();
      }else if (this.clockType === 'hour' && (hour === nowMinHour && minute <= nowMinMin)) {
        this.time.hour = nowMinHour;
        this.time.minute = nowMinMin;
      }else if (this.clockType === 'hour' && (hour === nowMaxHour && minute >= nowMaxMin)) {
        this.time.hour = nowMaxHour;
        this.time.minute = nowMaxMin;
      }
    }
  }

  private GetNowTime (hour: number, ampm: 'AM' | 'PM', minute: number): string {
    const Hour = (hour === 12 && ampm === 'AM') ? '0' : hour;
    const nowTime = Hour + ':' + minute + ' ' + ampm;
    return nowTime;
  }

  checkBet() {
    const nowTime = this.GetNowTime(this.time.hour, this.time.ampm, this.time.minute);
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
    console.log(this.config);
    if (this.config.preference) {
      this.preference = this.config.preference;
    }
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

  public GetSeparator () {
    if (this.preference && this.preference.separator) {
      return this.preference.separator;
    }
    return ':';
  }
  public GetPeriod (period: 'AM' | 'PM') {
    if (this.preference && this.preference.period) {
      return this.preference.period(period);
    }
    return period;
  }
  public GetMinute () {
    if (this.preference && this.preference.minute) {
      return this.preference.minute(this.time.minute);
    }
    return this.time.minute;
  }
  public GetHour () {
    if (this.preference && this.preference.hour) {
      return this.preference.hour(this.time.hour);
    }
    return this.time.hour;
  }
  public GetClockTime(clock: IClockNumber) {
    if ( ! this.preference) {
      return clock.time;
    }
    if ( this.clockType === 'hour' && this.preference.clockHour) {
      return this.preference.clockHour(clock.time);
    }
    if ( this.clockType === 'minute' && this.preference.clockMinute) {
      return this.preference.clockMinute(clock.time);
    }
    return clock.time;
  }

}
