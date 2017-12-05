import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  public ampm: String = 'AM';
  public nowTime: any = this.hour;
  public limited: any = {
    min: '10:54 AM',
    max: '3:10 PM'
  };

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
    return time;
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
    this.setActiveTime();
  }

  rotationClass = (degrees) => {
    degrees += 90;
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

      let pureDeg = Math.round(radians * 180 / Math.PI);
      let degrees = pureDeg;
      const degMod = degrees % step;
      if (degMod === 0) {
        return;
      } else if (degMod >= step / 2) {
        degrees = degrees + (step - degMod);
      } else if (degMod < step / 2) {
        degrees = degrees - degMod;
      }

      if (this.clockType === 'hour') {
        this.hour = (degrees / step) + 3;
        this.hour = (this.hour > 12) ? this.hour - 12 : this.hour;
      } else if (this.clockType === 'minute') {
        this.minute = (degrees / step) + 15;
        this.minute = (this.minute > 59) ? this.minute - 60 : this.minute;
      }

      this.ampm = (this.hour === 12 && pureDeg === 271) ? this.ampm === 'AM' ? 'PM' : "AM" : this.ampm;

      var currentTime = this.hour + ":" + this.minute + " " + this.ampm;
      
      // let lMax = this.limited.max.split(/[\s:]+/);
      // let lMaxHour = lMax[0];
      // let lMaxMinute = lMax[1];
      // let lMaxAMPM = lMax[2];
      //console.log("hour",this.hour,"minHour",lMinHour,"maxHour",lMaxHour);

      // if((this.hour >= lMinHour && this.ampm == lMinAMPM) || ( this.hour <= lMaxHour && this.ampm == lMaxAMPM)){
      //   if(this.minute >= lMinMinute && this.minute <= lMaxMinute){
      //     console.log("HELLO");
      //   }
        
      // }
      currentTime = this.timeToMinute(currentTime);
      if(currentTime >= this.timeToMinute(this.limited.min) &&  )

      console.log(this.timeToMinute(currentTime));

      // if( this.hour >= lMinHour && this.hour <= lMaxHour){
      //   if( this.minute >= lMinMinute && this.minute <= lMaxMinute){
      //     if(this.ampm === lMinAMPM || this.ampm === lMaxAMPM){
            this.rotationClass(degrees);
            this.setActiveTime();
      //     }
      //   }
      // }
      
      //console.log(this.hour + " : " + this.minute);
      
    }
  }

  private timeToMinute (time: string): number{
    let fullTime = time.split(/[\s:]+/);
    let lHour:any = fullTime[0];
    let lMinute:any = fullTime[1];
    let lampm = fullTime[2];
    lHour = lampm === 'PM' ? +lHour+ 12 : lHour;
    return +lMinute + (+lHour * 60);
  }

  ngOnInit() {
    this.clockMaker();
  }
}
