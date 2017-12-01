import { Component, OnInit, ElementRef } from '@angular/core';

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

  constructor(private element: ElementRef) { }


  public get Time () {
    return this.hour + ':' + this.minute;
  }
  clockMaker = (type) => {
    this.clockType = type;
    this.clockObject = [];
    var timeVal = (this.clockType == 'minute') ? 60 : 12;
    var timeStep = (this.clockType == 'minute') ? 5 : 1;
    var timeStart = (this.clockType == 'minute') ? 0 : 1;

    var r = 124;
    var j = r - 25;

    for (let min = timeStart; min <= timeVal; min += timeStep) {
      if (min != 0) {
        var str = String(min);
        var x = j * Math.sin(Math.PI * 2 * (min / timeVal));
        var y = j * Math.cos(Math.PI * 2 * (min / timeVal));

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
    if(obj != undefined || obj != null){
      this.clockType = obj.type;
      if(this.clockType == 'minute'){
        this.minute = obj.time;
      }else{
        this.hour = obj.time;
      }
    }
    var step = (this.clockType == 'minute') ? 6 : 30;
    var time = (this.clockType == 'minute') ? this.minute : this.hour;
    var degrees = time * step - 90;
    this.rotationClass(degrees);
  }

  rotationClass = (degrees) => {
    var arrowEl = this.element.nativeElement.querySelector('#tpc-arrow');
    arrowEl.style.transform = "rotate(" + degrees + "deg)";
    arrowEl.style.webkitTransform = "rotate(" + degrees + "deg)";
  }

  setMove = (status) => {
    this.isClicked = status;
  }

  getDegree = (e) => {
    var step = (this.clockType == 'minute') ? 6 : 30;
    if (this.isClicked && e.currentTarget === e.target) {
      let clock = {
        width: e.target.offsetWidth,
        height: e.target.offsetHeight
      }
      var targetX = clock.width / 2;
      var targetY = clock.height / 2;
      var Vx = Math.round(e.layerX - targetX);
      var Vy = Math.round(targetY - e.layerY);
      var radians = -Math.atan2(Vy, Vx);
      if (radians < 0) radians += 2 * Math.PI;

      var degrees = Math.round(radians * 180 / Math.PI);
      var degMod = degrees % step;
      if (degMod == 0) {
        return;
      } else if (degMod >= step / 2) {
        degrees = degrees + (step - degMod);
      } else if (degMod < step / 2) {
        degrees = degrees - degMod;
      }
      
      this.rotationClass(degrees);

      if(this.clockType == 'hour'){
        this.hour = (degrees / step) + 3;
        this.hour = (this.hour > 12) ? this.hour - 12 : this.hour;  
      }else if(this.clockType == 'minute'){
        this.minute = (degrees / step) + 15;
        this.minute = (this.minute > 60) ? this.minute - 60 : this.minute;
      }
    }
  }

  ngOnInit() {
    this.clockMaker('hour');
  }
}
