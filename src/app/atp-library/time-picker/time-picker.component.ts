import { Component, OnInit } from '@angular/core';
import { IClockNumber, IDisplayPreference, TimePickerConfig } from '../definitions';
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
  public config: TimePickerConfig;
  public appRef: any;
  public isPopup = true;
  public allowed: any;
  public preference: IDisplayPreference;
  public changeToMin: boolean;

  private animationTime = 0;

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

  setTime() {
    this.isClicked = false;
    if (this.config.changeToMinutes && !this.config.onlyHour && this.clockType === 'hour') {
      this.ChangeAnimational('minute');
    }
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

  /**
   * Check if clock button time is not in allowed times and disabled
   * @param t Button Time Value
   */
  checkDisabled(t) {
    const m = (this.clockType === 'minute') ? t : this.time.minute;
    const h = (this.clockType === 'hour') ? t : this.time.hour;
    const nowTime = this.GetNowTime(h, this.time.ampm, m);
    return (this.allowed.indexOf(nowTime) === -1) ? true : false;
  }

  modalAnimation() {
    setTimeout(() => {
      this.activeModal = true;
    }, 1);
  }

  ngOnInit() {
    this.allowed = this.core.allowedTimes (this.config.rangeTime.start, this.config.rangeTime.end);
    if (this.config && this.config.onlyMinute) {
      this.clockType = 'minute';
    }
    if (this.config) {
      if (this.config.onlyPM) {
        this.time.ampm = 'PM';
      } else if (this.config.onlyAM) {
        this.time.ampm = 'AM';
      }
    }
    this.clockMaker();
    this.modalAnimation();
  }

  public MinuteClick () {
    /**
     * We are not permitting user to select the minute.
     * but anyway, it will return the standard time, if provided the default time.
     */
    if (this.config && this.config.onlyHour) {
      return false;
    }

    this.ChangeAnimational('minute');
  }

  public HourClick () {
    /**
     * We are not permitting user to select the minute.
     * but anyway, it will return the standard time, if provided the default time.
     */
    if (this.config && this.config.onlyMinute) {
      return false;
    }
    this.ChangeAnimational('hour');
  }

  ChangeAnimational(type: 'minute' | 'hour') {
    if (this.clockType !== type) {
      if (this.config.animation === 'fade') {
        this.changeToMin = true;
        setTimeout(() => {
          this.changeToMin = false;
          this.clockType = type;
          this.clockMaker();
        }, 200);
      } else if (this.config.animation === 'rotate') {
        this.animationTime = 0.4;
        this.clockType = type;
        this.clockMaker();
      } else {
        this.clockType = type;
        this.clockMaker();
      }
    }
  }

  SetAM () {
    if (this.config && this.config.onlyPM) {
      return false;
    }
    this.time.ampm = 'AM';
    this.checkBet();
  }

  SetPM () {
    if (this.config && this.config.onlyAM) {
      return false;
    }
    this.time.ampm = 'PM';
    this.checkBet();
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

  getClockArrowStyle() {
    let arrowStyle = {};
    if (this.config.animation === 'rotate') {
        arrowStyle = {
          transform: 'rotate(' + this.degree + 'deg)',
          '-webkit-transform': 'rotate(' + this.degree + 'deg)',
          background: this.config.arrowStyle.background,
          '-webkit-transition': 'transform ' + this.getAnimationTime(),
          transition: 'transform ' + + this.getAnimationTime()
        };
    }else {
      arrowStyle = {
        transform: 'rotate(' + this.degree + 'deg)',
        '-webkit-transform': 'rotate(' + this.degree + 'deg)',
        background: this.config.arrowStyle.background,
      };
    }
    return arrowStyle;
  }

  getAnimationTime() {
    return this.animationTime + 's';
  }

  /**
   * Event on clock mouse click down
   * @param event - captured event
   */
  updateClockDown(event) {
    this.isClicked = true;
    this.animationTime = 0;
    this.getDegree(event);
  }


  setNewRotation() {
    const targetDegree = ((this.time.minute / 60) * 360) + 360;
    const targetDegree2 = targetDegree * 2;

    const diff1 = Math.abs(this.degree - targetDegree);
    const diff2 = Math.abs(this.degree - targetDegree2);

    if (diff1 < diff2) {
      this.rotationClass(targetDegree);
    } else {
      this.rotationClass(targetDegree2);
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
    let min: string = this.time.minute.toString();
    if (+min < 10) {
      min = '0' + min;
    }
    return min;
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

  public GetLabel (key: string) {
    const defaults = {
      'ok': 'Ok',
      'cancel': 'Cancel'
    };
    if ((this.preference && this.preference.labels && this.preference.labels.ok)) {
      defaults.ok = this.preference.labels.ok;
    }
    if ((this.preference && this.preference.labels && this.preference.labels.cancel)) {
      defaults.cancel = this.preference.labels.cancel;
    }
    return defaults[key];
  }

  public getTitle(): string {
    return this.preference.labels.title ? this.preference.labels.title : undefined;
  }
}
