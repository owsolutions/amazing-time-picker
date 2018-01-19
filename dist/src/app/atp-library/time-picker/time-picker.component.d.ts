import { OnInit, EventEmitter } from '@angular/core';
export declare class TimePickerComponent implements OnInit {
    selectedTime: EventEmitter<{}>;
    _ref: any;
    subject: any;
    activeModal: boolean;
    timerElement: any;
    clockObject: Array<any>;
    isClicked: boolean;
    clockType: String;
    hour: any;
    minute: any;
    ampm: String;
    nowTime: any;
    degree: any;
    config: any;
    appRef: any;
    ParseStringToTime(time: string): void;
    GetTime(): void;
    clockMaker: () => void;
    setActiveTime: () => void;
    setArrow: (obj: any) => void;
    rotationClass: (degrees: any) => void;
    getDegree: (ele: any) => void;
    modalAnimation(): void;
    ngOnInit(): void;
    Close(e: any): void;
}
