import { Directive, ViewContainerRef, Output, EventEmitter, HostListener } from '@angular/core';
import { AmazingTimePickerService } from './atp-time-picker.service';

@Directive({
  selector: 'input[atp-time-picker]'
})
export class AtpDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
    private atp: AmazingTimePickerService
  ) {}

  @Output() myClick = new EventEmitter();
  @HostListener('click', ['$event'])
  onClick(e) {
    const ele = this.viewContainerRef.element.nativeElement;
    const time = ele.value;
    const theme = ele.getAttribute('theme');
    const start = ele.getAttribute('start');
    const end = ele.getAttribute('end');
    const locale = ele.getAttribute('locale') || 'en';
    const changeToMinutes = ele.getAttribute('changeToMinutes') === 'true';
    const animate = ele.getAttribute('animate') === 'true';
    const preference = ele.getAttribute('preference') || null;
    let arrowStyle = ele.getAttribute('arrowStyle');
    arrowStyle = (arrowStyle) ? JSON.parse(arrowStyle.replace(new RegExp('\'', 'g'), '"')) : '';
    const timePickerFunction = this.atp.open({
      time,
      theme,
      rangeTime: { start, end},
      'arrowStyle': arrowStyle,
      locale,
      changeToMinutes,
      animate,
      preference
    });
    timePickerFunction.afterClose().subscribe(retTime => {
      ele.value = retTime;
    });
  }
}
