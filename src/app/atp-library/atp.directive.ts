import { Directive, ViewContainerRef, Output, EventEmitter, HostListener, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
  @Input() fastSelect: boolean;
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
    const changeToMinutes = ele.getAttribute('changeToMinutes') === 'true';
    const animation = ele.getAttribute('animation');
    const preference = ele.getAttribute('preference') || null;
    const onlyHour = ele.getAttribute('onlyHour') === 'true';
    const onlyMinute = ele.getAttribute('onlyMinute') === 'true';
    const onlyAM = ele.getAttribute('onlyAM') === 'true';
    const onlyPM = ele.getAttribute('onlyPM') === 'true';
    let arrowStyle = ele.getAttribute('arrowStyle');
    let fastSelect = this.fastSelect == undefined ? false : this.fastSelect;
    arrowStyle = (arrowStyle) ? JSON.parse(arrowStyle.replace(new RegExp('\'', 'g'), '"')) : '';
    const timePickerFunction = this.atp.open({
      time,
      theme,
      rangeTime: { start, end},
      'arrowStyle': arrowStyle,
      locale,
      changeToMinutes,
      animation,
      onlyHour,
      onlyMinute,
      onlyAM,
      onlyPM,
      preference,
      fastSelect
    });

    timePickerFunction.afterClose().subscribe(retTime => {
      this.writeValue(retTime); // update the native element
      this.onChange(retTime); // update the form value (if there's a form)
    });
  }

  @HostListener('input', ['$event'])
  onInput(e: any) {
    this.onChange(e.srcElement.value);
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
