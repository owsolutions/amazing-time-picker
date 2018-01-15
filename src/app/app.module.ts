import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutersGenerator } from './app.router';

import { AmazingTimePickerModule } from './atp-library/atp-time-picker.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './presentation/tabs/tabs.component';
import { TabComponent } from './presentation/tab/tab.component';
import { ExampleComponent } from './presentation/example/example.component';
import { ApiComponent } from './presentation/api/api.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TabComponent,
    ExampleComponent,
    ApiComponent,
  ],
  imports: [
    BrowserModule,
    AmazingTimePickerModule,
    appRoutersGenerator(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
