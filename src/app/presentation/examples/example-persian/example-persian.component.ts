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
  html = encode(`
   <button (click)="open()">Time</button>
   <input type="time" value="">
  `);
  ts = encode(`
  import { Component } from '@angular/core';
  import { AmazingTimePickerService } from 'amazing-time-picker';
  import { PersianPreference } from 'amazing-time-picker/preferences';

  @Component({
      selector: 'app-test',
      ${'templateUrl'}: './test.component.html',
      ${'styleUrls'}: ['./test.component.scss']
  })
  export class TestComponent {
      public selectedTime: string;
      constructor( private atp: AmazingTimePickerService ) { }
      open() {
          /**
           * ////////////////
           * We add preference to the modal open config,
           * you can explore built-in preferences or write for yourself
           */
          const amazingTimePicker = this.atp.open({
            locale: 'fa'
          });
          amazingTimePicker.afterClose().subscribe(time => {
              this.selectedTime = time;
          });
      }
  }
  `);
  public selectedTime: string;

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
