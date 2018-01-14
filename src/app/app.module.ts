import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmazingTimePickerModule } from './atp-library/atp-time-picker.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './presentation/tabs/tabs.component';
import { TabComponent } from './presentation/tab/tab.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TabComponent
  ],
  imports: [
    BrowserModule,
    AmazingTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
