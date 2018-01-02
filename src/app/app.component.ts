import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AmazingTimePickerService } from './dist-library/atp-time-picker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('myModal', { read: ViewContainerRef }) ref: ViewContainerRef;
  @ViewChild('salam', { read: ViewContainerRef }) salam: ViewContainerRef;

  constructor(private atp: AmazingTimePickerService) { }

  openModal(): void {
    const timeElement = this.salam.element.nativeElement;
    const amazingTimePicker = this.atp.open(this.ref, timeElement.value);
    amazingTimePicker.onClose().subscribe(time => {
      console.log(time);
      timeElement.value = time;
    });
  }
}
