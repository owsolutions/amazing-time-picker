import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from '../../../atp-library/atp-time-picker.service';

const encode = (x) => x.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
  return '&#' + i.charCodeAt(0) + ';';
});

@Component({
  selector: 'app-example-persian',
  templateUrl: './example-persian.component.html',
  styleUrls: ['./example-persian.component.scss']
})
export class ExamplePersianComponent implements OnInit {
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

  public openPersian () {
    const amazingTimePicker = this.atp.open({
      locale: 'fa'
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }
}
