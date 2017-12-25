import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { AtpTimePickerComponent } from './atp-time-picker/atp-time-picker.component';
import { AtpTimePickerService } from './atp-time-picker.service';

@NgModule({
  imports: [
    CommonModule,
    
  ],
  declarations: [
    TimePickerComponent,
    AtpTimePickerComponent
  ],
  providers: [AtpTimePickerService],
  entryComponents: [TimePickerComponent],
  exports: [
    TimePickerComponent,
    AtpTimePickerComponent
  ]
})
export class AmazingTimePickerModule { }
