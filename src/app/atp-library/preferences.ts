import { IDisplayPreference } from './definitions';

const arabic = new Intl.NumberFormat('fa-IR');
const persian = new Intl.NumberFormat('ar-AE');


export const PersianPreference: IDisplayPreference = {
  hour: (x) => persian.format(x),
  minute: (x) => {
    let exp = persian.format(x);
    if (exp.length === 1) {
      exp = '۰' + exp;
    }
    return exp;
  },
  separator: ':',
  period: (x) => x === 'AM' ? 'صبح' : 'عصر',
  clockHour: (x) => persian.format(x),
  clockMinute: (x) => persian.format(x),
  labels: {
    ok: 'تایید',
    cancel: 'لغو'
  }
};

export const ArabicPreference: IDisplayPreference = {

  hour: (x) => persian.format(x),
  minute: (x) => {
    let exp = persian.format(x);
    if (exp.length === 1) {
      exp = '۰' + exp;
    }
    return exp;
  },
  separator: ':',
  period: (x) => x === 'AM' ? 'صباحا' : 'مساء',
  clockHour: (x) => persian.format(x),
  clockMinute: (x) => persian.format(x),
  labels: {
    ok: 'حسنا',
    cancel: 'إلغاء'
  }
};
