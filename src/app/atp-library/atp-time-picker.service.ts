import { Injectable, ViewContainerRef, Injector, ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef } from '@angular/core';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { TimePickerConfig } from './definitions';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AmazingTimePickerService {

  constructor( private resolver: ComponentFactoryResolver,
               private appRef: ApplicationRef,
               private injector: Injector) {
  }

  open(config?: TimePickerConfig): any {
    const _self = this;
    config = config || {};
    config = {
      time: config.time || '00:00',
      theme: ['light', 'dark'].indexOf(config.theme) > 0 ? config.theme : 'light' || config.theme || 'light',
      arrowStyle: config.arrowStyle || {}
    };
    config.arrowStyle = {
      background: config.arrowStyle.background || 'blue',
      color: config.arrowStyle.color || '#fff'
    };
    const componentRef = this.resolver.resolveComponentFactory(TimePickerComponent);
    const tsc = componentRef.create(this.injector);
    this.appRef.attachView(tsc.hostView);
    const domElem = (tsc.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    tsc.instance.subject = new Subject<any>();
    tsc.instance._ref = tsc;
    tsc.instance.appRef = this.appRef;
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
