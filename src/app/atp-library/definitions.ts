import { Observable } from 'rxjs/Rx';

/**
 * AmazingTimePicker configuration
 * when calling open() function from 'AmazingTimePickerService' passed as parameter
 */
export interface TimePickerConfig {
  time?: string;
  theme?: 'dark' | 'light';
  rangeTime?: RangeTime;
  arrowStyle?: Pallete;
}

export interface RangeTime {
  start: string;
  end: string;
}

export interface Pallete {
  background?: string;
  color?: string;
}

export interface IDialogResult {
  afterClose(): Observable<string>;
}

export interface IClockNumber {
  time: String;
  left: string;
  top: string;
  type: String;
}



export interface IDisplayPreference {
  minute?: Function;
  hour?: Function;
  separator?: string;
  period?(period: 'AM' | 'PM');
}


export interface IClockPreference {
  minute?: Function;
  hour?: Function;
}
