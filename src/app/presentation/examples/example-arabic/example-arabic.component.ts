import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';

const encode = (x) => x.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
  return '&#' + i.charCodeAt(0) + ';';
});

@Component({
  selector: 'app-example-arabic',
  templateUrl: './example-arabic.component.html',
  styleUrls: ['./example-arabic.component.scss']
})
export class ExampleArabicComponent implements OnInit {
  public selectedTime: string;
  public sintax = '{{selectedTime}}';

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
