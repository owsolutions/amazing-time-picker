import { Directive, ViewContainerRef, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { AmazingTimePickerService } from './atp-time-picker.service';

@Directive({
  selector: 'input[atp-time-picker]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AtpDirective,
    multi: true
  }]
})
export class AtpDirective implements ControlValueAccessor {

  @Output() myClick = new EventEmitter();

  private elementRef: ElementRef;
  private onChange = (x: any): void => {};
  constructor(
      public viewContainerRef: ViewContainerRef,
      private atp: AmazingTimePickerService) {
    this.elementRef = this.viewContainerRef.element;
  }

  @HostListener('click', ['$event'])
  onClick(e) {
    const ele = this.viewContainerRef.element.nativeElement;
    const time = ele.value;
    const theme = ele.getAttribute('theme');
    const start = ele.getAttribute('start');
    const end = ele.getAttribute('end');
    const locale = ele.getAttribute('locale') || 'en';
    const preference = ele.getAttribute('preference') || null;
    let arrowStyle = ele.getAttribute('arrowStyle');
    arrowStyle = (arrowStyle) ? JSON.parse(arrowStyle.replace(new RegExp('\'', 'g'), '"')) : '';
    const timePickerFunction = this.atp.open({
      time,
      theme,
      rangeTime: { start, end},
      'arrowStyle': arrowStyle,
      locale,
      preference
    });

    timePickerFunction.afterClose().subscribe(retTime => {
      this.writeValue(retTime); // update the native element
      this.onChange(retTime); // update the form value (if there's a form)
    });
  }

  writeValue(value: any) {
    if (this.elementRef) {
      this.elementRef.nativeElement.value = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {  }
}
