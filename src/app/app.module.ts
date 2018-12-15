import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmazingTimePickerModule } from './atp-library/atp-time-picker.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,AmazingTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
