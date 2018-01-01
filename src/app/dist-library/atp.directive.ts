import { Directive, ViewContainerRef, Output, EventEmitter, HostListener, ElementRef, Renderer } from '@angular/core';
import { AtpTimePickerService } from './atp-time-picker.service';

@Directive({
  selector: '[atp-time-picker]'
})
export class AtpDirective {

  constructor(public viewContainerRef: ViewContainerRef,
    private atp: AtpTimePickerService,
    public el: ElementRef,
    public renderer: Renderer) {
  }

  @Output() myClick = new EventEmitter();
  @HostListener('click', ['$event'])
  onClick(e) {
    const ele = this.viewContainerRef.element.nativeElement;
    const time = ele.getAttribute('value');
    this.atp.open(this.viewContainerRef, time);
    this.atp.time.subscribe(retTime => {
      ele.setAttribute('value', retTime);
    });
  }
}
