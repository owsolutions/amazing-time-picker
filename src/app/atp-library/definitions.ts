import { Observable } from 'rxjs/Rx';

/**
 * AmazingTimePicker configuration
 * when calling open() function from 'AmazingTimePickerService' passed as parameter
 */
export interface TimePickerConfig {
  time?: string;
  theme?: 'dark' | 'light' | 'material-red' | 'material-green' | 'material-blue' | 'material-purple' | 'material-orange';
  rangeTime?: RangeTime;
  arrowStyle?: Pallete;
  locale?: string;
  preference?: IDisplayPreference;
  changeToMinutes?: boolean;
  onlyHour?: boolean;
  onlyMinute?: boolean;
  onlyAM?: boolean;
  onlyPM?: boolean;
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
  labels?: {
    ok?: string;
    cancel?: string;
  };
  period?(period: 'AM' | 'PM');
  clockMinute?(minute: any);
  clockHour?(hour: any);
}

export interface ITime {
  minute: number;
  hour: number;
  ampm: 'AM' | 'PM';
}

