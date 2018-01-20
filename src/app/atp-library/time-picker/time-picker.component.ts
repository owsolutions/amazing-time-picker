import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IClockNumber, IDisplayPreference } from '../definitions';

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
  public clockType: String = 'hour';
  public hour: any = 12;
  public minute: any = 0;
  public ampm: String = 'AM';
  public nowTime: any = this.hour;
  public degree: any;
  public config: any;
  public appRef: any;
  public isPopup = true;
  public allowed: any;
  private preference: IDisplayPreference;


  public ParseStringToTime (time: string): void {
    time = (time === '' || time === undefined || time === null) ? this.hour + ':' + this.minute : time;
    const [h, m] = time.split(':');
    let hour = +h > 12 ? +h - 12 : +h;
    hour = hour === 0 ? 12 : hour;
    this.hour = hour;
    this.minute = +m;
    const ampm = +h >= 12 ? 'PM' : 'AM';
    this.ampm = ampm;
  }

  public GetTime () {
    let hh = this.ampm === 'PM' ? +this.hour + 12 : +this.hour;
    if (this.ampm === 'AM' && hh === 12) {
      hh = 0;
    }
    if ( hh === 24) {
      hh = 12;
    }
    hh = hh < 10 ? '0' + hh : '' + hh as any;
    const mm = this.minute < 10 ? '0' + this.minute : this.minute;
    const time = `${hh}:${mm}`;
    this.subject.next(time);
  }

  private GenerateClockNumbers (type: String): Array<IClockNumber> {
    const items = [];
    const timeVal = (type === 'minute') ? 60 : 12;
    const timeStep = (type === 'minute') ? 5 : 1;
    const timeStart = (type === 'minute') ? 0 : 1;

    const r = 124;
    const j = r - 25;

    for (let min = timeStart; min <= timeVal; min += timeStep) {
      if (min !== 60) {
        const str = String(min);
        const x = j * Math.sin(Math.PI * 2 * (min / timeVal));
        const y = j * Math.cos(Math.PI * 2 * (min / timeVal));

        items.push({
          time: str,
          left: (x + r - 17) + 'px',
          top: (-y + r - 17) + 'px',
          type
        });
      }
    }
    return items;
  }
  clockMaker = () => {
    const type = this.clockType;
    this.clockObject = this.GenerateClockNumbers(type);
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
      const targetX = clock.width / 2;
      const targetY = clock.height / 2;
      const Vx = Math.round((ele.clientX - parrentPos.left) - targetX);
      const Vy = Math.round(targetY - (ele.clientY - parrentPos.top));
      let radians = -Math.atan2(Vy, Vx);
      radians += 2.5 * Math.PI;

      let degrees = Math.round(radians * 180 / Math.PI);
      const degMod = degrees % step;
      if (degMod === 0) {
        return;
      } else if (degMod >= step / 2) {
        degrees = degrees + (step - degMod);
      } else if (degMod < step / 2) {
        degrees = degrees - degMod;
      }
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

  allowedTimes(min, max) {
    const allTimes = [];
    const nowMinHour = +min.split(':')[0];
    const nowMaxHour = +max.split(':')[0];
    const nowMinMin = +min.split(':')[1];
    const nowMaxMin = +max.split(':')[1];
    for (let i = nowMinHour; i <= nowMaxHour; i++) {
      let j = 0,
          jDest = 59;
      if (i === nowMinHour) {
        j = nowMinMin;
      }else if (i === nowMaxHour) {
        jDest = nowMaxMin;
      }
      for (j; j <= jDest; j++) {
        const hour = i <= 12 ? i : i - 12;
        const minute = j;
        const ampm = i < 12 ? 'AM' : 'PM';
        allTimes.push(hour + ':' + minute + ' ' + ampm);
      }
    }
    return allTimes;
  }

  modalAnimation() {
    setTimeout(() => {
      this.activeModal = true;
    }, 1);
  }

  ngOnInit() {
    this.allowed = this.allowedTimes(this.config.rangeTime.start, this.config.rangeTime.end);
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
      return this.preference.minute(this.minute);
    }
    return this.minute;
  }
  public GetHour () {
    if (this.preference && this.preference.hour) {
      return this.preference.hour(this.hour);
    }
    return this.hour;
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
