import { Component } from '@angular/core';
import { AmazingTimePickerService } from '../../atp-library/atp-time-picker.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  public selectedTime: string;
  public sintax = '{{selectedTime}}';

  constructor( private atp: AmazingTimePickerService ) { }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }
}
