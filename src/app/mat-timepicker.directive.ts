import { Directive, ElementRef, HostListener } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TimePickerComponent } from './time-picker/time-picker.component';
/* tslint:disable */
@Directive({
  selector: '[mat-timepicker]'
})
/* tslint:enable */
export class MatTimePickerDirective {

  constructor(
    private el: ElementRef,
    private dialog: MatDialog
  ) {  }

  @HostListener('click') OnClick ($event) {

    const dialogRef = this.dialog.open(TimePickerComponent, {
      panelClass: 'dialog-box',
      data: {
        value: this.el.nativeElement.value
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.el.nativeElement.value = data;
      }
    });
  }
}
