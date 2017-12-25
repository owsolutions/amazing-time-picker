import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AtpTimePickerService } from './dist-library/atp-time-picker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('myModal', { read: ViewContainerRef }) ref: ViewContainerRef;
  title = 'app';

  constructor(
    private atp: AtpTimePickerService,
  ) {
  }

  openModal() {
    console.log(this.ref);
    this.atp.open(this.ref);
  }
}
