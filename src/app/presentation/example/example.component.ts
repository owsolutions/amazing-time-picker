import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  public selectedTime: string;
  public selectedTimeDark = '18:33';
  public sintax = '{{selectedTime}}';

  constructor(private atp: AmazingTimePickerService) { }

  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }

  openDark() {
    const amazingTimePicker = this.atp.open({
      time: this.selectedTimeDark,
      theme: 'dark',
      changeToMinutes: true,
      animation: 'rotate',
      arrowStyle: {
        background: 'red',
        color: 'white'
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTimeDark = time;
    });
  }
  toggleTab() {

  }

  onCustomEvent(response: string): void {

  }
}
