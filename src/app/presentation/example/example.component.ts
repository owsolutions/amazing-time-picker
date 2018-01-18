import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from '../../atp-library/atp-time-picker.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  public selectedTime: string;
  public sintax = '{{selectedTime}}';

  constructor(private atp: AmazingTimePickerService) { }

  open() {
    const amazingTimePicker = this.atp.open({
      time: '18:20',
      theme: 'dark',
      arrowStyle: { background: 'red', color: 'white'}
    });
    amazingTimePicker.afterClose().subscribe(time => {
      window['timepicker_testbed_value'] = time;
      this.selectedTime = time;
    });
  }

  toggleTab() {

  }
}
