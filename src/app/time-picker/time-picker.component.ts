import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  public clockObject: Array<any>;
  public isClicked: boolean;
  public clockType: String = 'hour';
  public hour: any = 10;
  public minute: any = 55;
  public ampm: String = 'PM';

  constructor(
    private element: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.value) {
      this.ParseStringToTime(data.value);
    }
  }

  private ParseStringToTime (time: string): void {
    const [h, m] = time.split(':');
    this.hour = +h > 12 ? +h - 12 : +h;
    this.minute = +m;
    this.ampm = +h > 12 ? 'PM' : 'AM';
    console.log(this.hour, this.minute, this.ampm);
  }

  public get Time () {
    let hh = this.ampm === 'PM' ? +this.hour + 12 : this.hour;
    hh = hh < 10 ? '0' + hh : hh;
    const mm = this.minute < 10 ? '0' + this.minute : this.minute;
    return `${hh}:${mm}`;
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
      if (min !== 0) {
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

  setArrow = (obj) => {
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
    const degrees = time * step - 90;
    this.rotationClass(degrees);
  }

  rotationClass = (degrees) => {
    const arrowEl = this.element.nativeElement.querySelector('#tpc-arrow');
    arrowEl.style.transform = 'rotate(' + degrees + 'deg)';
    arrowEl.style.webkitTransform = 'rotate(' + degrees + 'deg)';
  }

  getDegree = (e) => {
    const step = this.clockType === 'minute' ? 6 : 30;
    if (this.isClicked && e.currentTarget === e.target) {
      const clock = {
        width: e.target.offsetWidth,
        height: e.target.offsetHeight
      };
      const targetX = clock.width / 2;
      const targetY = clock.height / 2;
      const Vx = Math.round(e.layerX - targetX);
      const Vy = Math.round(targetY - e.layerY);
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
        this.minute = (this.minute > 60) ? this.minute - 60 : this.minute;
      }
    }
  }

  ngOnInit() {
    this.clockMaker();
  }
}
