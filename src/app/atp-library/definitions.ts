/**
 * AmazingTimePicker configuration
 * when calling open() function from 'AmazingTimePickerService' passed as parameter
 */
export interface TimePickerConfig {
    time?: string;
    theme?: string;
    style?: Pallete;
}

export interface Pallete {
    background?: string;
    color?: string;
}
