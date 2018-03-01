import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from '../../../atp-library/atp-time-picker.service';

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
  public selectedTime: string;
  public sintax = '{{selectedTime}}';

  constructor(
    private atp: AmazingTimePickerService,
  ) { }

  ngOnInit() {
  }

  public openPersian () {
    const amazingTimePicker = this.atp.open({
      theme: 'material-blue'
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }
}
