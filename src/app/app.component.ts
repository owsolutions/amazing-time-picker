import { Component, ViewContainerRef } from '@angular/core';
import { AmazingTimePickerService } from './atp-library/atp-time-picker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public selectedTime: string;
  constructor( private atp: AmazingTimePickerService, // this line you need
               public _ref: ViewContainerRef, // this line you need
             ) { }

  open() {
    const amazingTimePicker = this.atp.open(this._ref, {arrowColor: 'red', theme: 'red', time: this.selectedTime});
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }
}
