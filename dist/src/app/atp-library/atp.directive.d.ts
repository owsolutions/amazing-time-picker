import { ViewContainerRef, EventEmitter } from '@angular/core';
import { AmazingTimePickerService } from './atp-time-picker.service';
export declare class AtpDirective {
    viewContainerRef: ViewContainerRef;
    private atp;
    constructor(viewContainerRef: ViewContainerRef, atp: AmazingTimePickerService);
    myClick: EventEmitter<{}>;
    onClick(e: any): void;
}
