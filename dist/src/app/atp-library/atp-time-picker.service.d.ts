import { Injector, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { TimePickerConfig, IDialogResult } from './definitions';
export declare class AmazingTimePickerService {
    private resolver;
    private appRef;
    private injector;
    constructor(resolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    open(config?: TimePickerConfig): IDialogResult;
}
