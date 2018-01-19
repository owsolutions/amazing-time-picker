import { ApplicationRef, Component, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, Injectable, Injector, Input, NgModule, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject as Subject$1 } from 'rxjs/Subject';

class TimePickerComponent {
    constructor() {
        this.selectedTime = new EventEmitter();
        this.subject = null;
        this.activeModal = false;
        this.clockType = 'hour';
        this.hour = 12;
        this.minute = 0;
        this.ampm = 'AM';
        this.nowTime = this.hour;
        this.clockMaker = () => {
            const /** @type {?} */ type = this.clockType;
            this.clockObject = [];
            const /** @type {?} */ timeVal = (type === 'minute') ? 60 : 12;
            const /** @type {?} */ timeStep = (type === 'minute') ? 5 : 1;
            const /** @type {?} */ timeStart = (type === 'minute') ? 0 : 1;
            const /** @type {?} */ r = 124;
            const /** @type {?} */ j = r - 25;
            for (let /** @type {?} */ min = timeStart; min <= timeVal; min += timeStep) {
                if (min !== 60) {
                    const /** @type {?} */ str = String(min);
                    const /** @type {?} */ x = j * Math.sin(Math.PI * 2 * (min / timeVal));
                    const /** @type {?} */ y = j * Math.cos(Math.PI * 2 * (min / timeVal));
                    this.clockObject.push({
                        time: str,
                        left: (x + r - 17) + 'px',
                        top: (-y + r - 17) + 'px',
                        type
                    });
                }
            }
            this.setArrow(null);
        };
        this.setActiveTime = () => {
            this.nowTime = (this.clockType === 'minute' ? this.minute : this.hour);
        };
        this.setArrow = (obj) => {
            if (obj) {
                this.clockType = obj.type;
                if (this.clockType === 'minute') {
                    this.minute = obj.time;
                }
                else {
                    this.hour = obj.time;
                }
            }
            const /** @type {?} */ step = (this.clockType === 'minute') ? 6 : 30;
            const /** @type {?} */ time = (this.clockType === 'minute') ? this.minute : this.hour;
            const /** @type {?} */ degrees = time * step;
            this.rotationClass(degrees);
            this.setActiveTime();
        };
        this.rotationClass = (degrees) => {
            this.degree = degrees;
        };
        this.getDegree = (ele) => {
            const /** @type {?} */ step = this.clockType === 'minute' ? 6 : 30;
            const /** @type {?} */ parrentPos = ele.currentTarget.getBoundingClientRect();
            if (this.isClicked && (ele.currentTarget === ele.target || ele.target.nodeName === 'BUTTON')) {
                const /** @type {?} */ clock = {
                    width: ele.currentTarget.offsetWidth,
                    height: ele.currentTarget.offsetHeight
                };
                const /** @type {?} */ targetX = clock.width / 2;
                const /** @type {?} */ targetY = clock.height / 2;
                const /** @type {?} */ Vx = Math.round((ele.clientX - parrentPos.left) - targetX);
                const /** @type {?} */ Vy = Math.round(targetY - (ele.clientY - parrentPos.top));
                let /** @type {?} */ radians = -Math.atan2(Vy, Vx);
                console.log(radians);
                // if (radians < 0) {
                radians += 2.5 * Math.PI;
                // }
                let /** @type {?} */ degrees = Math.round(radians * 180 / Math.PI);
                console.log(degrees);
                const /** @type {?} */ degMod = degrees % step;
                if (degMod === 0) {
                    return;
                }
                else if (degMod >= step / 2) {
                    degrees = degrees + (step - degMod);
                }
                else if (degMod < step / 2) {
                    degrees = degrees - degMod;
                }
                this.rotationClass(degrees);
                if (this.clockType === 'hour') {
                    this.hour = (degrees / step);
                    this.hour = (this.hour > 12) ? this.hour - 12 : this.hour;
                }
                else if (this.clockType === 'minute') {
                    this.minute = (degrees / step);
                    this.minute = (this.minute > 59) ? this.minute - 60 : this.minute;
                }
                this.setActiveTime();
            }
        };
    }
    /**
     * @param {?} time
     * @return {?}
     */
    ParseStringToTime(time) {
        time = (time === '' || time === undefined || time === null) ? this.hour + ':' + this.minute : time;
        const [h, m] = time.split(':');
        let /** @type {?} */ hour = +h > 12 ? +h - 12 : +h;
        hour = hour === 0 ? 12 : hour;
        this.hour = hour;
        this.minute = +m;
        const /** @type {?} */ ampm = +h >= 12 ? 'PM' : 'AM';
        this.ampm = ampm;
    }
    /**
     * @return {?}
     */
    GetTime() {
        let /** @type {?} */ hh = this.ampm === 'PM' ? +this.hour + 12 : +this.hour;
        if (this.ampm === 'AM' && hh === 12) {
            hh = 0;
        }
        if (hh === 24) {
            hh = 12;
        }
        hh = hh < 10 ? '0' + hh : ('' + hh);
        const /** @type {?} */ mm = this.minute < 10 ? '0' + this.minute : this.minute;
        const /** @type {?} */ time = `${hh}:${mm}`;
        this.selectedTime.emit(time);
        this.subject.next(time);
    }
    /**
     * @return {?}
     */
    modalAnimation() {
        setTimeout(() => {
            this.activeModal = true;
        }, 1);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.clockMaker();
        this.modalAnimation();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    Close(e) {
        if (e.target === e.currentTarget) {
            this.activeModal = false;
            setTimeout(() => {
                this.appRef.detachView(this._ref.hostView);
                this._ref.destroy();
            }, 400);
        }
    }
}
TimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'time-picker',
                template: `
    <div id="time-picker-wrapper" class="{{config.theme}}" [ngClass]="{'active': activeModal}" (click)="Close($event);">
      <div id="time-picker" [ngClass]="{'active': activeModal}">
        <div class="time-picker-header">
          <div class="time-picker-selected-time">
              <div class="time-picker-hour" (click)="clockType='hour';clockMaker()" [ngClass]="{'selected' : clockType == 'hour'}">{{hour}}</div>
              <span class="time-seprator">:</span>
              <div class="time-picker-minute" (click)="clockType='minute';clockMaker()" [ngClass]="{'selected' : clockType == 'minute'}">{{minute}}</div>
          </div>
          <div class="time-picker-selected-ampm">
            <div class="time-picker-am" (click)="ampm = 'AM';" [ngClass]="{'selected' : ampm == 'AM'}">AM</div>
            <div class="time-picker-pm" (click)="ampm = 'PM';" [ngClass]="{'selected' : ampm == 'PM'}">PM</div>
          </div>
        </div>
        <div class="time-picker-content">
            <div class="time-picker-clock" (mousemove)="getDegree($event);" (mousedown)="isClicked = true;getDegree($event);" (mouseup)="isClicked = false;">
              <button *ngFor="let clock of clockObject" [ngClass]="{'active' : nowTime == clock.time}" 
                [id]="'timepicker-item-id-' + clock.time" 
                [ngStyle]="{top: clock.top,left: clock.left, color: nowTime == clock.time ? config.arrowStyle.color : config.theme == 'light' ? '#000' : '#eee', background: nowTime == clock.time ? config.arrowStyle.background : 'transparent'}">
                {{clock.time}}
              </button>
              <div class="time-picker-clock-origin" [ngStyle]="{ background: config.arrowStyle.background}"></div>
              <div id="tpc-arrow" class="time-picker-clock-arrow" [ngStyle]="{transform: 'rotate(' + this.degree + 'deg)','-webkit-transform': 'rotate(' + this.degree + 'deg)', background: config.arrowStyle.background}">
                <span [ngStyle]="{ background: config.arrowStyle.background }"></span>
              </div>
            </div>
        </div>
        <div class="time-picker-footer">
            <button (click)="Close($event);">Cancel</button>
            <button (click)="GetTime();Close($event);" class="atp-ref-dialog-close">OK</button>
        </div>
      </div>
    </div>
  `,
                styles: [`
    #time-picker-wrapper {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: transparent;
      -webkit-transition: background 0.4s;
      transition: background 0.4s;
      font-family: 'Roboto', sans-serif;
      z-index: 1000; }
      #time-picker-wrapper.active {
        background: rgba(0, 0, 0, 0.3); }
      #time-picker-wrapper.dark #time-picker {
        background: #424242; }
        #time-picker-wrapper.dark #time-picker .time-picker-header {
          border-bottom: none;
          background: #555555; }
          #time-picker-wrapper.dark #time-picker .time-picker-header .time-picker-selected-time {
            color: #999; }
            #time-picker-wrapper.dark #time-picker .time-picker-header .time-picker-selected-time div.selected {
              color: #fff; }
          #time-picker-wrapper.dark #time-picker .time-picker-header .time-picker-selected-ampm {
            color: #999; }
            #time-picker-wrapper.dark #time-picker .time-picker-header .time-picker-selected-ampm div.selected {
              color: #fff; }
        #time-picker-wrapper.dark #time-picker .time-picker-clock {
          background: #555555; }
        #time-picker-wrapper.dark #time-picker .time-picker-footer {
          border-top: none; }
          #time-picker-wrapper.dark #time-picker .time-picker-footer button {
            background: #555555;
            color: #fff; }
            #time-picker-wrapper.dark #time-picker .time-picker-footer button:hover {
              background: #777; }
      #time-picker-wrapper.light #time-picker {
        background: #fff; }
        #time-picker-wrapper.light #time-picker .time-picker-header {
          border-bottom: 1px solid #e1e1e1; }
          #time-picker-wrapper.light #time-picker .time-picker-header .time-picker-selected-time {
            color: #aaa; }
            #time-picker-wrapper.light #time-picker .time-picker-header .time-picker-selected-time div.selected {
              color: #000; }
          #time-picker-wrapper.light #time-picker .time-picker-header .time-picker-selected-ampm {
            color: #aaa; }
            #time-picker-wrapper.light #time-picker .time-picker-header .time-picker-selected-ampm div.selected {
              color: #000; }
        #time-picker-wrapper.light #time-picker .time-picker-clock {
          background: #ededed; }
        #time-picker-wrapper.light #time-picker .time-picker-footer {
          border-top: 1px solid #e1e1e1; }
          #time-picker-wrapper.light #time-picker .time-picker-footer button {
            background: #f1f1f1; }
            #time-picker-wrapper.light #time-picker .time-picker-footer button:hover {
              background: #ddd; }
      #time-picker-wrapper #time-picker {
        width: 325px;
        height: auto;
        -webkit-box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
                box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
        border-radius: 2px;
        margin: 15vh auto !important;
        -webkit-transform: scale(0.5) !important;
                transform: scale(0.5) !important;
        -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
        transition: opacity 0.3s, -webkit-transform 0.3s;
        transition: transform 0.3s, opacity 0.3s;
        transition: transform 0.3s, opacity 0.3s, -webkit-transform 0.3s;
        opacity: 0; }
        #time-picker-wrapper #time-picker.active {
          -webkit-transform: scale(1) !important;
                  transform: scale(1) !important;
          opacity: 1; }
        #time-picker-wrapper #time-picker .time-picker-header {
          text-align: center;
          padding: 15px 0px; }
          #time-picker-wrapper #time-picker .time-picker-header .time-picker-selected-time {
            font-size: 35px;
            padding: 5px 0px; }
            #time-picker-wrapper #time-picker .time-picker-header .time-picker-selected-time div {
              display: inline-block;
              cursor: pointer; }
          #time-picker-wrapper #time-picker .time-picker-header .time-picker-selected-ampm {
            font-size: 18px; }
            #time-picker-wrapper #time-picker .time-picker-header .time-picker-selected-ampm div {
              display: inline-block;
              padding: 0 5px;
              cursor: pointer; }
        #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock {
          width: 200px;
          height: 200px;
          padding: 24px;
          border-radius: 50%;
          cursor: pointer;
          margin: 25px auto;
          position: relative;
          user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -webkit-user-select: none; }
          #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock button {
            border: none;
            background: transparent;
            position: absolute;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 17px;
            text-align: center;
            padding: 0;
            -webkit-transition: all .2s;
            transition: all .2s;
            z-index: 3; }
            #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock button:hover {
              background: #fafafa; }
            #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock button.active {
              background: blue;
              color: #fff; }
          #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock .time-picker-clock-origin {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -3px;
            margin-top: -3px; }
          #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock .time-picker-clock-arrow {
            width: 2px;
            height: 41%;
            background: blue;
            position: absolute;
            left: 0;
            top: 22px;
            right: 0;
            margin: auto;
            -webkit-transform-origin: top left;
            transform-origin: bottom; }
            #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock .time-picker-clock-arrow span {
              width: 8px;
              height: 8px;
              border-radius: 50%;
              position: absolute;
              top: 0;
              right: -3px; }
        #time-picker-wrapper #time-picker .time-picker-footer {
          padding: 15px;
          text-align: right; }
          #time-picker-wrapper #time-picker .time-picker-footer button {
            border: transparent;
            margin-left: 10px;
            padding: 10px;
            font-size: 14px;
            border-radius: 2px;
            cursor: pointer; }

    * {
      outline: none;
      -webkit-box-sizing: content-box;
              box-sizing: content-box; }
  `]
            },] },
];
/**
 * @nocollapse
 */
TimePickerComponent.ctorParameters = () => [];
TimePickerComponent.propDecorators = {
    'selectedTime': [{ type: Output },],
};

class AmazingTimePickerService {
    /**
     * @param {?} resolver
     * @param {?} appRef
     * @param {?} injector
     */
    constructor(resolver, appRef, injector) {
        this.resolver = resolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    open(config) {
        config = config || {};
        config = {
            time: config.time || '00:00',
            theme: ['light', 'dark'].indexOf(config.theme) > 0 ? config.theme : 'light' || config.theme || 'light',
            arrowStyle: config.arrowStyle || {}
        };
        config.arrowStyle = {
            background: (config.arrowStyle.background) ?
                config.arrowStyle.background : config.theme !== undefined ?
                config.theme === 'dark' ? 'rgb(128, 203, 196)' : 'blue' : 'blue',
            color: config.arrowStyle.color || '#fff'
        };
        const /** @type {?} */ componentRef = this.resolver.resolveComponentFactory(TimePickerComponent);
        const /** @type {?} */ tsc = componentRef.create(this.injector);
        this.appRef.attachView(tsc.hostView);
        const /** @type {?} */ domElem = (((tsc.hostView)).rootNodes[0]);
        document.body.appendChild(domElem);
        tsc.instance.subject = new Subject$1();
        tsc.instance._ref = tsc;
        tsc.instance.appRef = this.appRef;
        tsc.instance.timerElement = '';
        tsc.instance.config = config;
        tsc.instance.ParseStringToTime(config.time);
        return {
            afterClose: function () {
                return tsc.instance.subject.asObservable();
            }
        };
    }
}
AmazingTimePickerService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AmazingTimePickerService.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: ApplicationRef, },
    { type: Injector, },
];

class AtpTimePickerComponent {
    /**
     * @param {?} resolver
     * @param {?} _ref
     * @param {?} atp
     */
    constructor(resolver, _ref, atp) {
        this.resolver = resolver;
        this._ref = _ref;
        this.atp = atp;
        this._state = 'container';
        this._validStates = ['container', 'icon', 'input'];
        this._icon = true;
        this._disabled = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set icon(value) {
        this._icon = value === 'true' ? true : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value === 'true' ? true : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set state(value) {
        this._state = value;
    }
    /**
     * @return {?}
     */
    set() {
        const /** @type {?} */ ele = this.container.element.nativeElement;
        const /** @type {?} */ timePickerFunction = this.atp.open(ele.value);
        timePickerFunction.afterClose().subscribe(retTime => {
            ele.value = retTime;
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const /** @type {?} */ targetAttr = this._state.toLowerCase();
        if (this._validStates.indexOf(targetAttr) > -1) {
            const /** @type {?} */ targets = this._ref.nativeElement.querySelectorAll('[data-target*=' + targetAttr + ']');
            if (targets) {
                let /** @type {?} */ target;
                for (target of targets) {
                    target.addEventListener('click', e => {
                        this.set();
                    });
                }
            }
        }
    }
}
AtpTimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'atp-time-picker',
                template: `
    <div class='atp-time-picker'>
      <div class="icon-container" data-target="container-icon" >
        <svg *ngIf="_icon" style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="#000000" d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" />
        </svg>
        <ng-content select="i"></ng-content>
      </div>
      <input type="time" data-target="container-input" value="{{value}}" [disabled]="_disabled"  #container>
    </div>
  `,
                styles: [`
    .atp-time-picker .icon-container {
      display: inline-block;
      margin-right: .2em; }
      .atp-time-picker .icon-container svg {
        cursor: pointer;
        position: relative;
        top: .5em; }
      .atp-time-picker .icon-container /deep/ i {
        cursor: pointer; }
  `]
            },] },
];
/**
 * @nocollapse
 */
AtpTimePickerComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: ElementRef, },
    { type: AmazingTimePickerService, },
];
AtpTimePickerComponent.propDecorators = {
    'container': [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] },],
    'icon': [{ type: Input },],
    'disabled': [{ type: Input },],
    'state': [{ type: Input },],
    'value': [{ type: Input },],
    'class': [{ type: Input },],
};

class AtpDirective {
    /**
     * @param {?} viewContainerRef
     * @param {?} atp
     */
    constructor(viewContainerRef, atp) {
        this.viewContainerRef = viewContainerRef;
        this.atp = atp;
        this.myClick = new EventEmitter();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onClick(e) {
        const /** @type {?} */ ele = this.viewContainerRef.element.nativeElement;
        const /** @type {?} */ time = ele.getAttribute('value');
        const /** @type {?} */ theme = ele.getAttribute('theme');
        let /** @type {?} */ arrowStyle = ele.getAttribute('arrowStyle');
        arrowStyle = (arrowStyle) ? JSON.parse(arrowStyle.replace(new RegExp('\'', 'g'), '"')) : '';
        const /** @type {?} */ timePickerFunction = this.atp.open({ time, theme, 'arrowStyle': arrowStyle });
        timePickerFunction.afterClose().subscribe(retTime => {
            ele.value = retTime;
        });
    }
}
AtpDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[atp-time-picker]'
            },] },
];
/**
 * @nocollapse
 */
AtpDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: AmazingTimePickerService, },
];
AtpDirective.propDecorators = {
    'myClick': [{ type: Output },],
    'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
};

class AmazingTimePickerModule {
}
AmazingTimePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                declarations: [
                    TimePickerComponent,
                    AtpTimePickerComponent,
                    AtpDirective
                ],
                providers: [AmazingTimePickerService],
                entryComponents: [TimePickerComponent],
                exports: [
                    TimePickerComponent,
                    AtpTimePickerComponent,
                    AtpDirective
                ]
            },] },
];
/**
 * @nocollapse
 */
AmazingTimePickerModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { AmazingTimePickerModule, AmazingTimePickerService, AtpTimePickerComponent as ɵb, AtpDirective as ɵc, TimePickerComponent as ɵa };
//# sourceMappingURL=amazing-time-picker.js.map
