import { Observable } from 'rxjs/Rx';
/**
 * AmazingTimePicker configuration
 * when calling open() function from 'AmazingTimePickerService' passed as parameter
 */
export interface TimePickerConfig {
    time?: string;
    theme?: 'dark' | 'light';
    arrowStyle?: Pallete;
}
export interface Pallete {
    background?: string;
    color?: string;
}
export interface IDialogResult {
    afterClose(): Observable<string>;
}
