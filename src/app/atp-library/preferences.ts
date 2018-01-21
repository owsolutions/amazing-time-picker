import { IDisplayPreference } from './definitions';

const arabicNumbers = {
  '1': '۱', '2': '۲', '3': '۳', '4': '۴', '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹', '0': '۰'
};

/**
 * Formats the numbers display'n to user to arabic instead of latin numbers
 */
export const PersianPreference: IDisplayPreference = {
  hour: (x) => (x + '').split('').map(m => arabicNumbers[m] ? arabicNumbers[m] : m).join(''),
  minute: (x) => {
    let exp = (x + '').split('').map(m => arabicNumbers[m] ? arabicNumbers[m] : m).join('');
    if (exp.length === 1) {
      exp = '۰' + exp;
    }
    return exp;
  },
  separator: ':',
  period: (x) => x === 'AM' ? 'صبح' : 'عصر',
  clockHour: (x) => (x + '').split('').map(m => arabicNumbers[m] ? arabicNumbers[m] : m).join(''),
  clockMinute: (x) => (x + '').split('').map(m => arabicNumbers[m] ? arabicNumbers[m] : m).join(''),
  labels: {
    ok: 'تایید',
    cancel: 'لغو'
  }
};

export const ArabicPreference: IDisplayPreference = {
  hour: PersianPreference.hour,
  minute: PersianPreference.minute,
  separator: ':',
  period: (x) => x === 'AM' ? 'صباحا' : 'مساء',
  clockHour: PersianPreference.clockHour,
  labels: {
    ok: 'حسنا',
    cancel: 'إلغاء'
  }
};
