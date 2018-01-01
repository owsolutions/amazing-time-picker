import { Injectable, ViewContainerRef, Input, ElementRef, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class AtpTimePickerService {

  public time = new EventEmitter();

  constructor(private resolver: ComponentFactoryResolver) {
  }

  open(container: ViewContainerRef, time: string): any {
    const _self = this;
    const testComponent = this.resolver.resolveComponentFactory(TimePickerComponent);
    const tsc = container.createComponent(testComponent);
    tsc.instance._ref = tsc;
    tsc.instance.timerElement = '';
    tsc.instance.ParseStringToTime(time);
    tsc.instance.selectedTime.subscribe(retTime => {
      _self.time.emit(retTime);
    });

    return {
      onClose: function salam(): Observable<string> {
        return Observable.of('salam').delay(5000);
      }
    };
  }
}
