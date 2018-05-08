import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';

const encode = (x) => x.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
  return '&#' + i.charCodeAt(0) + ';';
});

@Component({
  selector: 'app-example-hour',
  templateUrl: './example-hour.component.html',
  styleUrls: ['./example-hour.component.scss']
})
export class ExampleHourComponent implements OnInit {
  interface = encode(`
  export interface IDisplayPreference {
    minute?: Function;
    hour?: Function;
    onlyHour?: boolean;
    separator?: string;
    labels?: {
      ok?: string;
      cancel?: string;
    };
    period?(period: 'AM' | 'PM');
    clockMinute?(minute: any);
    clockHour?(hour: any);
  }
  `);
  public selectedTime: string;
  public sintax = '{{selectedTime}}';

  constructor(
    private atp: AmazingTimePickerService,
  ) { }

  ngOnInit() {
  }

  public openHour () {
    const amazingTimePicker = this.atp.open({
      time: '3:30',
      onlyHour: true
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }
}
