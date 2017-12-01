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

  @HostListener('click') OnClick () {
    const dialogRef = this.dialog.open(TimePickerComponent, {
      panelClass: 'dialog-box'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.el.nativeElement.value = data;
      }
    });
  }
}
