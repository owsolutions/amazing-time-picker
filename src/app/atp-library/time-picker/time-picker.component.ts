import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  @Output() selectedTime = new EventEmitter();

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
    console.error('time >>>>>>');
    console.log('TIME');
    // let hh = this.ampm === 'PM' ? +this.hour + 12 : +this.hour;
    let hh = this.hour;
    // if (this.ampm === 'AM' && hh === 12) {
    //   hh = 0;
    // }
    // if ( hh === 24) {
    //   hh = 12;
    // }
    // hh = hh < 10 ? '0' + hh : '' + hh as any;
    const mm = this.minute < 10 ? '0' + this.minute : this.minute;
    const time = `xxx${hh}:${mm}`;
    this.selectedTime.emit(time);
    this.subject.next(time);
  }

  clockMaker = () => {
    const type = this.clockType;
    this.clockObject = [];
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

        this.clockObject.push({
          time: str,
          left: (x + r - 17) + 'px',
          top: (-y + r - 17) + 'px',
          type
        });
      }
    }
    this.setArrow(null);
  }

  setActiveTime = () => {
    this.nowTime = (this.clockType === 'minute' ? this.minute : this.hour);
  }

  setArrow = (obj: any) => {
    if (obj && obj.time) {
      this.clockType = obj.type;
      if (this.clockType === 'minute') {
        this.minute = obj.time;
      } else {
        this.hour = obj.time;
      }
    }
    const step = (this.clockType === 'minute') ? 6 : 30;
    const time = (this.clockType === 'minute') ? this.minute : this.hour;
    const degrees = time * step - 90;
    this.rotationClass(degrees);
    this.setActiveTime();
  }

  rotationClass = (degrees: any) => {
    this.degree = degrees += 90;
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
      const Vx = Math.round((ele.clientX - parrentPos.x) - targetX);
      const Vy = Math.round(targetY - (ele.clientY - parrentPos.y));
      let radians = -Math.atan2(Vy, Vx);
      if (radians < 0) {
        radians += 2 * Math.PI;
      }

      let degrees = Math.round(radians * 180 / Math.PI);
      const degMod = degrees % step;
      if (degMod === 0) {
        return;
      } else if (degMod >= step / 2) {
        degrees = degrees + (step - degMod);
      } else if (degMod < step / 2) {
        degrees = degrees - degMod;
      }

      this.rotationClass(degrees);

      if (this.clockType === 'hour') {
        this.hour = (degrees / step) + 3;
        this.hour = (this.hour > 12) ? this.hour - 12 : this.hour;
      } else if (this.clockType === 'minute') {
        this.minute = (degrees / step) + 15;
        this.minute = (this.minute > 59) ? this.minute - 60 : this.minute;
      }
      this.setActiveTime();
    }
  }

  modalAnimation() {
    setTimeout(() => {
      this.activeModal = true;
    }, 1);
  }

  ngOnInit() {
    this.clockMaker();
    this.modalAnimation();
  }

  Close(e: any) {
      if (e.target === e.currentTarget) {
        this.activeModal = false;
        setTimeout(() => {
          this.appRef.detachView(this._ref.hostView);
          this._ref.destroy();
        }, 400);
      }
  }
}
