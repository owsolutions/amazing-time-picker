import { Component } from '@angular/core';
import { AmazingTimePickerService } from '../../atp-library/atp-time-picker.service'; // this line you need

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  public selectedTime: string;

  constructor( private atp: AmazingTimePickerService ) { } // this line you need

  open() {
    const amazingTimePicker = this.atp.open({
      time: '18:20',
      arrowStyle: {background: '#80cbc4', color: '#000'},
      theme: 'dark'
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }
}
