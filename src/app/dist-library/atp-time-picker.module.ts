import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { AtpTimePickerComponent } from './atp-time-picker/atp-time-picker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TimePickerComponent,
    AtpTimePickerComponent
  ],
  entryComponents: [TimePickerComponent],
  exports: [
    TimePickerComponent,
    AtpTimePickerComponent
  ]
})
export class AmazingTimePicker { }
