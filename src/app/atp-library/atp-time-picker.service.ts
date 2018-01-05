import { Injectable, ViewContainerRef, Input, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { TimePickerConfig } from './definitions';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class AmazingTimePickerService {

  constructor(private resolver: ComponentFactoryResolver) {
  }

  open(container: ViewContainerRef, config?: TimePickerConfig ): any {
    config = config || {time: '00:00', theme: '', arrowColor: 'red'};
    const _self = this;
    const testComponent = this.resolver.resolveComponentFactory(TimePickerComponent);
    const tsc = container.createComponent(testComponent);
    tsc.instance.subject = new Subject<any>();
    tsc.instance._ref = tsc;
    tsc.instance.timerElement = '';
    tsc.instance.ParseStringToTime(config.time || '00:00');
    return {
      afterClose: function(){
        return tsc.instance.subject.asObservable();
      }
    };
  }

}
