import { IDisplayPreference } from './definitions';


/**
 * Formats the numbers displayed on top of the timepicker with two digits
 * any time selected by user, will be formatted in this one
 */
export const DoubleDigitPreference: IDisplayPreference = {
  hour: (x) => +x < 10 ? '0' + x : x,
  minute: (x) => +x < 10 ? '0' + x : x,
  separator: ':'
};

const arabicNumbers = {
  '1': '۱', '2': '۲', '3': '۳', '4': '۴', '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹', '0': '۰'
};

/**
 * Formats the numbers display'n to user to arabic instead of latin numbers
 */
export const PersianDigitPreference: IDisplayPreference = {
  hour: (x) => (x + '').split('').map(m => arabicNumbers[m] ? arabicNumbers[m] : m).join(''),
  minute: (x) => (x + '').split('').map(m => arabicNumbers[m] ? arabicNumbers[m] : m).join(''),
  separator: ':',
  period: (x) => x === 'AM' ? 'صبح' : 'عصر',
  clockHour: (x) => (x + '').split('').map(m => arabicNumbers[m] ? arabicNumbers[m] : m).join(''),
  clockMinute: (x) => (x + '').split('').map(m => arabicNumbers[m] ? arabicNumbers[m] : m).join('')
};
