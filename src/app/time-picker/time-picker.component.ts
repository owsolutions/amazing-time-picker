import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  public clockObject: Array<any>;

  constructor() { }

  clockMaker = (type: String) => {
    this.clockObject = [];
    var timeVal = (type == 'minute') ? 60 : 12;
    var timeStep = (type == 'minute') ? 5 : 1;
    var timeStart = (type == 'minute') ? 0 : 1;

    var r = 124;
    var j = r-25;

    for(let min = timeStart; min <= timeVal; min+= timeStep){
      if (min != 0){
        var str = String(min);
        var x = j*Math.sin(Math.PI*2*(min/timeVal));
        var y = j*Math.cos(Math.PI*2*(min/timeVal));
        
        this.clockObject.push({
          time: str,
          left: (x + r - 17) + 'px',
          top: (-y + r - 17) + 'px'
        });
      }
    }

    console.log(this.clockObject);
  }

  ngOnInit() {
    this.clockMaker("hour");
  }

}
