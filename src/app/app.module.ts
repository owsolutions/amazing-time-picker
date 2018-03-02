import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutersGenerator } from './app.router';

import { AmazingTimePickerModule } from './atp-library/atp-time-picker.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './presentation/tabs/tabs.component';
import { TabComponent } from './presentation/tab/tab.component';
import { ExampleComponent } from './presentation/example/example.component';
import { ApiComponent } from './presentation/api/api.component';
import { ExamplePersianComponent } from './presentation/examples/example-persian/example-persian.component';
import { ExampleArabicComponent } from './presentation/examples/example-arabic/example-arabic.component';
import { ExampleMaterialComponent } from './presentation/examples/example-material/example-material.component';
import { ExampleHourComponent } from './presentation/examples/example-hour/example-hour.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TabComponent,
    ExampleComponent,
    ApiComponent,
    ExamplePersianComponent,
    ExampleHourComponent,
    ExampleArabicComponent,
    ExampleMaterialComponent,
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
