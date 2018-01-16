import { Component, ViewChild, ElementRef } from '@angular/core';
import { AmazingTimePickerService } from '../../atp-library/atp-time-picker.service'; // this line you need

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  public selectedTime: string;
  public ele: any;
  @ViewChild('tab1') tabs: ElementRef;

  constructor( private atp: AmazingTimePickerService, private _ref: ElementRef ) { } // this line you need

  open() {
    const amazingTimePicker = this.atp.open({
      time: '18:20',
      // arrowStyle: {background: 'red', color: '#000'},
      theme: 'dark'
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  }

  toggleTab() {
    console.log(this.tabs.nativeElement);
  }
}
