import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';

const encode = (x) => x.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
  return '&#' + i.charCodeAt(0) + ';';
});

@Component({
  selector: 'app-example-material',
  templateUrl: './example-material.component.html',
  styleUrls: ['./example-material.component.scss']
})
export class ExampleMaterialComponent implements OnInit {
  interface = encode(`
  export interface IDisplayPreference {
    minute?: Function;
    hour?: Function;
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
  public selectedTime = '18:30';
  public sintax = '{{selectedTime}}';

  constructor(
    private atp: AmazingTimePickerService,
  ) { }

  ngOnInit() {
  }

  public openByTheme (theme: any) {
    const amazingTimePicker = this.atp.open({
      time: this.selectedTime,
      theme
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }
}
