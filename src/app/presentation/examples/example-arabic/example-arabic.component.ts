import { Component, OnInit } from '@angular/core';
import { ArabicPreference } from '../../../atp-library/preferences';
import { AmazingTimePickerService } from '../../../atp-library/atp-time-picker.service';

const encode = (x) => x.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
  return '&#' + i.charCodeAt(0) + ';';
});

@Component({
  selector: 'app-example-arabic',
  templateUrl: './example-arabic.component.html',
  styleUrls: ['./example-arabic.component.scss']
})
export class ExampleArabicComponent implements OnInit {

  html = encode(`
   <button (click)="open()">Time</button>
   <input type="time" value="">
  `);
  ts = encode(`
  import { Component } from '@angular/core';
  import { AmazingTimePickerService } from 'amazing-time-picker';
  import { ArabicPreference } from 'amazing-time-picker/preferences';

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
            preference: ArabicPreference
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

  public openArabic () {
    const amazingTimePicker = this.atp.open({
      locale: 'ar'
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }
}
