import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmazingTimePicker } from './dist-library/atp-time-picker.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AmazingTimePicker
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }