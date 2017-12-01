import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { MatTimepickerDirective } from './mat-timepicker.directive';

@NgModule({
  declarations: [
    AppComponent,
    TimePickerComponent,
    MatTimepickerDirective
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    TimePickerComponent
  ]
})
export class MatTimePickerModule { }
