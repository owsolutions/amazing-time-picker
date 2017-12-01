import { Directive, ElementRef, HostListener } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TimePickerComponent } from './time-picker/time-picker.component';

@Directive({
  selector: '[mat-timepicker]'
})
export class MatTimepickerDirective {
  
  constructor(
    private el: ElementRef,
    private dialog: MatDialog
  ) {  }

  @HostListener('click') OnClick () {
    let dialogRef = this.dialog.open(TimePickerComponent, {
      panelClass: 'dialog-box'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.el.nativeElement.value = data;
      }
    })
  }
}
