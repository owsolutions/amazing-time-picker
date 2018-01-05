import { Injectable, ViewContainerRef, Input, ElementRef, ComponentFactoryResolver } from '@angular/core';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { TimePickerConfig } from './definitions';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class AmazingTimePickerService {

  constructor(private resolver: ComponentFactoryResolver) {
  }

  open(container: ViewContainerRef, config?: TimePickerConfig): any {
    const _self = this;
    config = config || {};
    config = {
      time: config.time || '00:00',
      theme: config.theme || 'light',
      style: config.style || {}
    };
    config.style = {
      background: config.style.background || 'blue',
      color: config.style.color || '#fff'
    };
    const testComponent = this.resolver.resolveComponentFactory(TimePickerComponent);
    const tsc = container.createComponent(testComponent);
    tsc.instance.subject = new Subject<any>();
    tsc.instance._ref = tsc;
    tsc.instance.timerElement = '';
    tsc.instance.config = config;
    tsc.instance.ParseStringToTime(config.time);
    return {
      afterClose: function () {
        return tsc.instance.subject.asObservable();
      }
    };
  }

}
