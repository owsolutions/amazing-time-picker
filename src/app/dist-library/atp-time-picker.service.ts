import { Injectable, ViewContainerRef, Input, ElementRef, ComponentFactoryResolver, } from '@angular/core';
import { TimePickerComponent } from './time-picker/time-picker.component';
@Injectable()
export class AtpTimePickerService {
  constructor( private resolver: ComponentFactoryResolver) {}

  open(container: ViewContainerRef) {
    const testComponent = this.resolver.resolveComponentFactory(TimePickerComponent);
    const tsc = container.createComponent(testComponent);
    tsc.instance._ref = tsc;
    tsc.instance.timerElement = '';
    tsc.instance.selectedTime.subscribe(function (time: any) {
      //ele.value = time;
    });
  }
}
