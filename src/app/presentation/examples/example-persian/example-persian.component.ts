import { Component, OnInit } from '@angular/core';
import { PersianDigitPreference } from '../../../atp-library/preferences';
import { AmazingTimePickerService } from '../../../atp-library/atp-time-picker.service';

@Component({
  selector: 'app-example-persian',
  templateUrl: './example-persian.component.html',
  styleUrls: ['./example-persian.component.scss']
})
export class ExamplePersianComponent implements OnInit {

  public selectedTime: string;

  constructor(
    private atp: AmazingTimePickerService,
  ) { }

  ngOnInit() {
  }


  public openPersian () {
    const amazingTimePicker = this.atp.open({
      preference: PersianDigitPreference
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }
}
