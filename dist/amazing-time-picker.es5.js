import { ApplicationRef, Component, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, Injectable, Injector, Input, NgModule, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject as Subject$1 } from 'rxjs/Subject';
var TimePickerComponent = (function () {
    function TimePickerComponent() {
        var _this = this;
        this.selectedTime = new EventEmitter();
        this.subject = null;
        this.activeModal = false;
        this.clockType = 'hour';
        this.hour = 12;
        this.minute = 0;
        this.ampm = 'AM';
        this.nowTime = this.hour;
        this.clockMaker = function () {
            var /** @type {?} */ type = _this.clockType;
            _this.clockObject = [];
            var /** @type {?} */ timeVal = (type === 'minute') ? 60 : 12;
            var /** @type {?} */ timeStep = (type === 'minute') ? 5 : 1;
            var /** @type {?} */ timeStart = (type === 'minute') ? 0 : 1;
            var /** @type {?} */ r = 124;
            var /** @type {?} */ j = r - 25;
            for (var /** @type {?} */ min = timeStart; min <= timeVal; min += timeStep) {
                if (min !== 60) {
                    var /** @type {?} */ str = String(min);
                    var /** @type {?} */ x = j * Math.sin(Math.PI * 2 * (min / timeVal));
                    var /** @type {?} */ y = j * Math.cos(Math.PI * 2 * (min / timeVal));
                    _this.clockObject.push({
                        time: str,
                        left: (x + r - 17) + 'px',
                        top: (-y + r - 17) + 'px',
                        type: type
                    });
                }
            }
            _this.setArrow(null);
        };
        this.setActiveTime = function () {
            _this.nowTime = (_this.clockType === 'minute' ? _this.minute : _this.hour);
        };
        this.setArrow = function (obj) {
            if (obj) {
                _this.clockType = obj.type;
                if (_this.clockType === 'minute') {
                    _this.minute = obj.time;
                }
                else {
                    _this.hour = obj.time;
                }
            }
            var /** @type {?} */ step = (_this.clockType === 'minute') ? 6 : 30;
            var /** @type {?} */ time = (_this.clockType === 'minute') ? _this.minute : _this.hour;
            var /** @type {?} */ degrees = time * step;
            _this.rotationClass(degrees);
            _this.setActiveTime();
        };
        this.rotationClass = function (degrees) {
            _this.degree = degrees;
        };
        this.getDegree = function (ele) {
            var /** @type {?} */ step = _this.clockType === 'minute' ? 6 : 30;
            var /** @type {?} */ parrentPos = ele.currentTarget.getBoundingClientRect();
            if (_this.isClicked && (ele.currentTarget === ele.target || ele.target.nodeName === 'BUTTON')) {
                var /** @type {?} */ clock = {
                    width: ele.currentTarget.offsetWidth,
                    height: ele.currentTarget.offsetHeight
                };
                var /** @type {?} */ targetX = clock.width / 2;
                var /** @type {?} */ targetY = clock.height / 2;
                var /** @type {?} */ Vx = Math.round((ele.clientX - parrentPos.left) - targetX);
                var /** @type {?} */ Vy = Math.round(targetY - (ele.clientY - parrentPos.top));
                var /** @type {?} */ radians = -Math.atan2(Vy, Vx);
                console.log(radians);
                // if (radians < 0) {
                radians += 2.5 * Math.PI;
                // }
                var /** @type {?} */ degrees = Math.round(radians * 180 / Math.PI);
                console.log(degrees);
                var /** @type {?} */ degMod = degrees % step;
                if (degMod === 0) {
                    return;
                }
                else if (degMod >= step / 2) {
                    degrees = degrees + (step - degMod);
                }
                else if (degMod < step / 2) {
                    degrees = degrees - degMod;
                }
                _this.rotationClass(degrees);
                if (_this.clockType === 'hour') {
                    _this.hour = (degrees / step);
                    _this.hour = (_this.hour > 12) ? _this.hour - 12 : _this.hour;
                }
                else if (_this.clockType === 'minute') {
                    _this.minute = (degrees / step);
                    _this.minute = (_this.minute > 59) ? _this.minute - 60 : _this.minute;
                }
                _this.setActiveTime();
            }
        };
    }
    /**
     * @param {?} time
     * @return {?}
     */
    TimePickerComponent.prototype.ParseStringToTime = function (time) {
        time = (time === '' || time === undefined || time === null) ? this.hour + ':' + this.minute : time;
        var _a = time.split(':'), h = _a[0], m = _a[1];
        var /** @type {?} */ hour = +h > 12 ? +h - 12 : +h;
        hour = hour === 0 ? 12 : hour;
        this.hour = hour;
        this.minute = +m;
        var /** @type {?} */ ampm = +h >= 12 ? 'PM' : 'AM';
        this.ampm = ampm;
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.GetTime = function () {
        var /** @type {?} */ hh = this.ampm === 'PM' ? +this.hour + 12 : +this.hour;
        if (this.ampm === 'AM' && hh === 12) {
            hh = 0;
        }
        if (hh === 24) {
            hh = 12;
        }
        hh = hh < 10 ? '0' + hh : ('' + hh);
        var /** @type {?} */ mm = this.minute < 10 ? '0' + this.minute : this.minute;
        var /** @type {?} */ time = hh + ":" + mm;
        this.selectedTime.emit(time);
        this.subject.next(time);
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.modalAnimation = function () {
        var _this = this;
        setTimeout(function () {
            _this.activeModal = true;
        }, 1);
    };
    /**
     * @return {?}
     */
    TimePickerComponent.prototype.ngOnInit = function () {
        this.clockMaker();
        this.modalAnimation();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    TimePickerComponent.prototype.Close = function (e) {
        var _this = this;
        if (e.target === e.currentTarget) {
            this.activeModal = false;
            setTimeout(function () {
                _this.appRef.detachView(_this._ref.hostView);
                _this._ref.destroy();
            }, 400);
        }
    };
    return TimePickerComponent;
}());
TimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'time-picker',
                template: "\n    <div id=\"time-picker-wrapper\" class=\"{{config.theme}}\" [ngClass]=\"{'active': activeModal}\" (click)=\"Close($event);\">\n      <div id=\"time-picker\" [ngClass]=\"{'active': activeModal}\">\n        <div class=\"time-picker-header\">\n          <div class=\"time-picker-selected-time\">\n              <div class=\"time-picker-hour\" (click)=\"clockType='hour';clockMaker()\" [ngClass]=\"{'selected' : clockType == 'hour'}\">{{hour}}</div>\n              <span class=\"time-seprator\">:</span>\n              <div class=\"time-picker-minute\" (click)=\"clockType='minute';clockMaker()\" [ngClass]=\"{'selected' : clockType == 'minute'}\">{{minute}}</div>\n          </div>\n          <div class=\"time-picker-selected-ampm\">\n            <div class=\"time-picker-am\" (click)=\"ampm = 'AM';\" [ngClass]=\"{'selected' : ampm == 'AM'}\">AM</div>\n            <div class=\"time-picker-pm\" (click)=\"ampm = 'PM';\" [ngClass]=\"{'selected' : ampm == 'PM'}\">PM</div>\n          </div>\n        </div>\n        <div class=\"time-picker-content\">\n            <div class=\"time-picker-clock\" (mousemove)=\"getDegree($event);\" (mousedown)=\"isClicked = true;getDegree($event);\" (mouseup)=\"isClicked = false;\">\n              <button *ngFor=\"let clock of clockObject\" [ngClass]=\"{'active' : nowTime == clock.time}\" \n                [id]=\"'timepicker-item-id-' + clock.time\" \n                [ngStyle]=\"{top: clock.top,left: clock.left, color: nowTime == clock.time ? config.arrowStyle.color : config.theme == 'light' ? '#000' : '#eee', background: nowTime == clock.time ? config.arrowStyle.background : 'transparent'}\">\n                {{clock.time}}\n              </button>\n              <div class=\"time-picker-clock-origin\" [ngStyle]=\"{ background: config.arrowStyle.background}\"></div>\n              <div id=\"tpc-arrow\" class=\"time-picker-clock-arrow\" [ngStyle]=\"{transform: 'rotate(' + this.degree + 'deg)','-webkit-transform': 'rotate(' + this.degree + 'deg)', background: config.arrowStyle.background}\">\n                <span [ngStyle]=\"{ background: config.arrowStyle.background }\"></span>\n              </div>\n            </div>\n        </div>\n        <div class=\"time-picker-footer\">\n            <button (click)=\"Close($event);\">Cancel</button>\n            <button (click)=\"GetTime();Close($event);\" class=\"atp-ref-dialog-close\">OK</button>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    #time-picker-wrapper {\n      position: fixed;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background: transparent;\n      -webkit-transition: background 0.4s;\n      transition: background 0.4s;\n      font-family: 'Roboto', sans-serif;\n      z-index: 1000; }\n      #time-picker-wrapper.active {\n        background: rgba(0, 0, 0, 0.3); }\n      #time-picker-wrapper.dark #time-picker {\n        background: #424242; }\n        #time-picker-wrapper.dark #time-picker .time-picker-header {\n          border-bottom: none;\n          background: #555555; }\n          #time-picker-wrapper.dark #time-picker .time-picker-header .time-picker-selected-time {\n            color: #999; }\n            #time-picker-wrapper.dark #time-picker .time-picker-header .time-picker-selected-time div.selected {\n              color: #fff; }\n          #time-picker-wrapper.dark #time-picker .time-picker-header .time-picker-selected-ampm {\n            color: #999; }\n            #time-picker-wrapper.dark #time-picker .time-picker-header .time-picker-selected-ampm div.selected {\n              color: #fff; }\n        #time-picker-wrapper.dark #time-picker .time-picker-clock {\n          background: #555555; }\n        #time-picker-wrapper.dark #time-picker .time-picker-footer {\n          border-top: none; }\n          #time-picker-wrapper.dark #time-picker .time-picker-footer button {\n            background: #555555;\n            color: #fff; }\n            #time-picker-wrapper.dark #time-picker .time-picker-footer button:hover {\n              background: #777; }\n      #time-picker-wrapper.light #time-picker {\n        background: #fff; }\n        #time-picker-wrapper.light #time-picker .time-picker-header {\n          border-bottom: 1px solid #e1e1e1; }\n          #time-picker-wrapper.light #time-picker .time-picker-header .time-picker-selected-time {\n            color: #aaa; }\n            #time-picker-wrapper.light #time-picker .time-picker-header .time-picker-selected-time div.selected {\n              color: #000; }\n          #time-picker-wrapper.light #time-picker .time-picker-header .time-picker-selected-ampm {\n            color: #aaa; }\n            #time-picker-wrapper.light #time-picker .time-picker-header .time-picker-selected-ampm div.selected {\n              color: #000; }\n        #time-picker-wrapper.light #time-picker .time-picker-clock {\n          background: #ededed; }\n        #time-picker-wrapper.light #time-picker .time-picker-footer {\n          border-top: 1px solid #e1e1e1; }\n          #time-picker-wrapper.light #time-picker .time-picker-footer button {\n            background: #f1f1f1; }\n            #time-picker-wrapper.light #time-picker .time-picker-footer button:hover {\n              background: #ddd; }\n      #time-picker-wrapper #time-picker {\n        width: 325px;\n        height: auto;\n        -webkit-box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);\n                box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);\n        border-radius: 2px;\n        margin: 15vh auto !important;\n        -webkit-transform: scale(0.5) !important;\n                transform: scale(0.5) !important;\n        -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;\n        transition: opacity 0.3s, -webkit-transform 0.3s;\n        transition: transform 0.3s, opacity 0.3s;\n        transition: transform 0.3s, opacity 0.3s, -webkit-transform 0.3s;\n        opacity: 0; }\n        #time-picker-wrapper #time-picker.active {\n          -webkit-transform: scale(1) !important;\n                  transform: scale(1) !important;\n          opacity: 1; }\n        #time-picker-wrapper #time-picker .time-picker-header {\n          text-align: center;\n          padding: 15px 0px; }\n          #time-picker-wrapper #time-picker .time-picker-header .time-picker-selected-time {\n            font-size: 35px;\n            padding: 5px 0px; }\n            #time-picker-wrapper #time-picker .time-picker-header .time-picker-selected-time div {\n              display: inline-block;\n              cursor: pointer; }\n          #time-picker-wrapper #time-picker .time-picker-header .time-picker-selected-ampm {\n            font-size: 18px; }\n            #time-picker-wrapper #time-picker .time-picker-header .time-picker-selected-ampm div {\n              display: inline-block;\n              padding: 0 5px;\n              cursor: pointer; }\n        #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock {\n          width: 200px;\n          height: 200px;\n          padding: 24px;\n          border-radius: 50%;\n          cursor: pointer;\n          margin: 25px auto;\n          position: relative;\n          user-select: none;\n          -moz-user-select: none;\n          -ms-user-select: none;\n          -webkit-user-select: none; }\n          #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock button {\n            border: none;\n            background: transparent;\n            position: absolute;\n            width: 35px;\n            height: 35px;\n            border-radius: 50%;\n            cursor: pointer;\n            font-size: 17px;\n            text-align: center;\n            padding: 0;\n            -webkit-transition: all .2s;\n            transition: all .2s;\n            z-index: 3; }\n            #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock button:hover {\n              background: #fafafa; }\n            #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock button.active {\n              background: blue;\n              color: #fff; }\n          #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock .time-picker-clock-origin {\n            width: 6px;\n            height: 6px;\n            border-radius: 50%;\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            margin-left: -3px;\n            margin-top: -3px; }\n          #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock .time-picker-clock-arrow {\n            width: 2px;\n            height: 41%;\n            background: blue;\n            position: absolute;\n            left: 0;\n            top: 22px;\n            right: 0;\n            margin: auto;\n            -webkit-transform-origin: top left;\n            transform-origin: bottom; }\n            #time-picker-wrapper #time-picker .time-picker-content .time-picker-clock .time-picker-clock-arrow span {\n              width: 8px;\n              height: 8px;\n              border-radius: 50%;\n              position: absolute;\n              top: 0;\n              right: -3px; }\n        #time-picker-wrapper #time-picker .time-picker-footer {\n          padding: 15px;\n          text-align: right; }\n          #time-picker-wrapper #time-picker .time-picker-footer button {\n            border: transparent;\n            margin-left: 10px;\n            padding: 10px;\n            font-size: 14px;\n            border-radius: 2px;\n            cursor: pointer; }\n\n    * {\n      outline: none;\n      -webkit-box-sizing: content-box;\n              box-sizing: content-box; }\n  "]
            },] },
];
/**
 * @nocollapse
 */
TimePickerComponent.ctorParameters = function () { return []; };
TimePickerComponent.propDecorators = {
    'selectedTime': [{ type: Output },],
};
var AmazingTimePickerService = (function () {
    /**
     * @param {?} resolver
     * @param {?} appRef
     * @param {?} injector
     */
    function AmazingTimePickerService(resolver, appRef, injector) {
        this.resolver = resolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    AmazingTimePickerService.prototype.open = function (config) {
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
        var /** @type {?} */ componentRef = this.resolver.resolveComponentFactory(TimePickerComponent);
        var /** @type {?} */ tsc = componentRef.create(this.injector);
        this.appRef.attachView(tsc.hostView);
        var /** @type {?} */ domElem = (((tsc.hostView)).rootNodes[0]);
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
    };
    return AmazingTimePickerService;
}());
AmazingTimePickerService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
AmazingTimePickerService.ctorParameters = function () { return [
    { type: ComponentFactoryResolver, },
    { type: ApplicationRef, },
    { type: Injector, },
]; };
var AtpTimePickerComponent = (function () {
    /**
     * @param {?} resolver
     * @param {?} _ref
     * @param {?} atp
     */
    function AtpTimePickerComponent(resolver, _ref, atp) {
        this.resolver = resolver;
        this._ref = _ref;
        this.atp = atp;
        this._state = 'container';
        this._validStates = ['container', 'icon', 'input'];
        this._icon = true;
        this._disabled = false;
    }
    Object.defineProperty(AtpTimePickerComponent.prototype, "icon", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._icon = value === 'true' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AtpTimePickerComponent.prototype, "disabled", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = value === 'true' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AtpTimePickerComponent.prototype, "state", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._state = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AtpTimePickerComponent.prototype.set = function () {
        var /** @type {?} */ ele = this.container.element.nativeElement;
        var /** @type {?} */ timePickerFunction = this.atp.open(ele.value);
        timePickerFunction.afterClose().subscribe(function (retTime) {
            ele.value = retTime;
        });
    };
    /**
     * @return {?}
     */
    AtpTimePickerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var /** @type {?} */ targetAttr = this._state.toLowerCase();
        if (this._validStates.indexOf(targetAttr) > -1) {
            var /** @type {?} */ targets = this._ref.nativeElement.querySelectorAll('[data-target*=' + targetAttr + ']');
            if (targets) {
                var /** @type {?} */ target = void 0;
                for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
                    target = targets_1[_i];
                    target.addEventListener('click', function (e) {
                        _this.set();
                    });
                }
            }
        }
    };
    return AtpTimePickerComponent;
}());
AtpTimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'atp-time-picker',
                template: "\n    <div class='atp-time-picker'>\n      <div class=\"icon-container\" data-target=\"container-icon\" >\n        <svg *ngIf=\"_icon\" style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n          <path fill=\"#000000\" d=\"M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z\" />\n        </svg>\n        <ng-content select=\"i\"></ng-content>\n      </div>\n      <input type=\"time\" data-target=\"container-input\" value=\"{{value}}\" [disabled]=\"_disabled\"  #container>\n    </div>\n  ",
                styles: ["\n    .atp-time-picker .icon-container {\n      display: inline-block;\n      margin-right: .2em; }\n      .atp-time-picker .icon-container svg {\n        cursor: pointer;\n        position: relative;\n        top: .5em; }\n      .atp-time-picker .icon-container /deep/ i {\n        cursor: pointer; }\n  "]
            },] },
];
/**
 * @nocollapse
 */
AtpTimePickerComponent.ctorParameters = function () { return [
    { type: ComponentFactoryResolver, },
    { type: ElementRef, },
    { type: AmazingTimePickerService, },
]; };
AtpTimePickerComponent.propDecorators = {
    'container': [{ type: ViewChild, args: ['container', { read: ViewContainerRef },] },],
    'icon': [{ type: Input },],
    'disabled': [{ type: Input },],
    'state': [{ type: Input },],
    'value': [{ type: Input },],
    'class': [{ type: Input },],
};
var AtpDirective = (function () {
    /**
     * @param {?} viewContainerRef
     * @param {?} atp
     */
    function AtpDirective(viewContainerRef, atp) {
        this.viewContainerRef = viewContainerRef;
        this.atp = atp;
        this.myClick = new EventEmitter();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    AtpDirective.prototype.onClick = function (e) {
        var /** @type {?} */ ele = this.viewContainerRef.element.nativeElement;
        var /** @type {?} */ time = ele.getAttribute('value');
        var /** @type {?} */ theme = ele.getAttribute('theme');
        var /** @type {?} */ arrowStyle = ele.getAttribute('arrowStyle');
        arrowStyle = (arrowStyle) ? JSON.parse(arrowStyle.replace(new RegExp('\'', 'g'), '"')) : '';
        var /** @type {?} */ timePickerFunction = this.atp.open({ time: time, theme: theme, 'arrowStyle': arrowStyle });
        timePickerFunction.afterClose().subscribe(function (retTime) {
            ele.value = retTime;
        });
    };
    return AtpDirective;
}());
AtpDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[atp-time-picker]'
            },] },
];
/**
 * @nocollapse
 */
AtpDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: AmazingTimePickerService, },
]; };
AtpDirective.propDecorators = {
    'myClick': [{ type: Output },],
    'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
};
var AmazingTimePickerModule = (function () {
    function AmazingTimePickerModule() {
    }
    return AmazingTimePickerModule;
}());
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
AmazingTimePickerModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { AmazingTimePickerModule, AmazingTimePickerService, AtpTimePickerComponent as ɵb, AtpDirective as ɵc, TimePickerComponent as ɵa };
//# sourceMappingURL=amazing-time-picker.es5.js.map
