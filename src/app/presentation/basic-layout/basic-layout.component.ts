import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss']
})
export class LayoutBasicComponent implements OnInit {
  public Directive = `<input atp-time-picker value="19:00"/>`;
  public appModule = `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmazingTimePickerModule } from 'amazing-time-picker'; // this line you need
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AmazingTimePickerModule // this line you need
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }`;
  constructor() {}

  ngOnInit() {}
}
