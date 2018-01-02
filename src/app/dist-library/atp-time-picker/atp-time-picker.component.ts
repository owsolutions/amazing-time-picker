import { Component, ViewChild, ViewContainerRef, Input, ElementRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { AmazingTimePickerService } from '../atp-time-picker.service';

@Component({
  selector: 'atp-time-picker',
  templateUrl: './atp-time-picker.component.html',
  styleUrls: ['./atp-time-picker.component.scss']
})

export class AtpTimePickerComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  private _state = 'container';
  private _validStates: Array<string> = ['container', 'icon', 'input'];
  public _icon = true;
  public _disabled = false;

  @Input() set icon(value: string){
    this._icon = value === 'true' ? true : false;
  }
  @Input() set disabled(value: string){
    this._disabled = value === 'true' ? true : false;
  }
  @Input() set state(value: string) {
    this._state = value;
  }
  @Input() value: string;
  @Input() class: string;

  constructor( private resolver: ComponentFactoryResolver,
               private _ref: ElementRef,
               private atp: AmazingTimePickerService
  ) {}

  set() {
    const ele = this.container.element.nativeElement;
    this.atp.open(this.container, ele.value);
    this.atp.time.subscribe(retTime => {
      ele.value = retTime;
    });
  }

  ngAfterViewInit() {
    const targetAttr = this._state.toLowerCase();
    if (this._validStates.indexOf(targetAttr) > -1) {
      const targets = this._ref.nativeElement.querySelectorAll('[data-target*=' + targetAttr + ']');
      if (targets) {
        let target: any;
        for (target of targets) {
          target.addEventListener('click', e => {
           this.set();
          });
        }
      }
    }
  }

}
