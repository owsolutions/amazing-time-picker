import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutersGenerator } from './app.router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { SnackAdComponent } from './snack-ad/snack-ad.component';
import { FullLayoutComponent } from './presentation/full-layout/full-layout.component';
import { LayoutBasicComponent } from './presentation/basic-layout/basic-layout.component';

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
    SnackAdComponent,
    FullLayoutComponent,
    LayoutBasicComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AmazingTimePickerModule,
    appRoutersGenerator()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
