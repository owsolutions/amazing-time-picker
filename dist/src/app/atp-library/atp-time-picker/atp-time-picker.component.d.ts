import { ViewContainerRef, ElementRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { AmazingTimePickerService } from '../atp-time-picker.service';
export declare class AtpTimePickerComponent implements AfterViewInit {
    private resolver;
    private _ref;
    private atp;
    container: ViewContainerRef;
    private _state;
    private _validStates;
    _icon: boolean;
    _disabled: boolean;
    icon: string;
    disabled: string;
    state: string;
    value: string;
    class: string;
    constructor(resolver: ComponentFactoryResolver, _ref: ElementRef, atp: AmazingTimePickerService);
    set(): void;
    ngAfterViewInit(): void;
}
