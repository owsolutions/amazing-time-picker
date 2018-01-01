import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AtpTimePickerService } from './dist-library/atp-time-picker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('myModal', { read: ViewContainerRef }) ref: ViewContainerRef;
  @ViewChild('salam', { read: ViewContainerRef }) salam: ViewContainerRef;

  constructor(private atp: AtpTimePickerService) { }

  openModal(): void {
    const timeElement = this.salam.element.nativeElement;
    const timePickerRef = this.atp.open(this.ref, timeElement.value);
    this.atp.time.subscribe(time => {
      timeElement.value = time;
    });
  }
}
