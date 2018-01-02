import { Injectable, ViewContainerRef, Input, ElementRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class AmazingTimePickerService {

  selectedTime = new Subject<any>();

  constructor(private resolver: ComponentFactoryResolver) {
  }

  open(container: ViewContainerRef, time: string): any {
    const _self = this;
    const testComponent = this.resolver.resolveComponentFactory(TimePickerComponent);
    const tsc = container.createComponent(testComponent);
    tsc.instance._ref = tsc;
    tsc.instance.timerElement = '';
    tsc.instance.ParseStringToTime(time);
    return {
      onClose: function(){
        return _self.selectedTime.asObservable();
      }
    };
  }

}
