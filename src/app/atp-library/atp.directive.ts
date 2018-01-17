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
    const time = ele.getAttribute('value');
    const theme = ele.getAttribute('theme');
    let arrowStyle = ele.getAttribute('arrowStyle');
    arrowStyle = (arrowStyle) ? JSON.parse(arrowStyle.replace(new RegExp('\'', 'g'), '"')) : '';
    const timePickerFunction = this.atp.open({time, theme, 'arrowStyle': arrowStyle});
    timePickerFunction.afterClose().subscribe(retTime => {
      ele.value = retTime;
    });
  }
}
