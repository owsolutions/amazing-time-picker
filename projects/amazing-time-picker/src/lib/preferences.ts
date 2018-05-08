import { IDisplayPreference } from './definitions';

const arabic = new Intl.NumberFormat('ar-AE');
const persian = new Intl.NumberFormat('fa-IR');

export const PersianPreference: IDisplayPreference = {
  hour: (x) => persian.format(x),
  minute: (x) => {
    let exp = persian.format(x);
    if (exp.length === 1) {
      exp = persian.format(0) + exp;
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
  hour: (x) => arabic.format(x),
  minute: (x) => {
    let exp = arabic.format(x);
    if (exp.length === 1) {
      exp = arabic.format(0) + exp;
    }
    return exp;
  },
  separator: ':',
  period: (x) => x === 'AM' ? 'صباحا' : 'مساء',
  clockHour: (x) => arabic.format(x),
  clockMinute: (x) => arabic.format(x),
  labels: {
    ok: 'حسنا',
    cancel: 'إلغاء'
  }
};

export const ChinesePreference: IDisplayPreference = {
  hour:  (x) => x,
  minute: (x) => {
    let exp = x;
    if (exp.length === 1) {
      exp = '۰' + exp;
    }
    return exp;
  },
  separator: ':',
  period: (x) => x === 'AM' ? '上午' : '下午',
  clockHour: (x) => x,
  clockMinute: (x) => x,
  labels: {
    ok: '好',
    cancel: '取消'
  }
};

export const Preference = (locale: string): IDisplayPreference => {
  switch (locale) {
    case 'fa':
        return PersianPreference;
    case 'ar':
        return ArabicPreference;
    case 'ch':
        return ChinesePreference;
    default:
      return null;
  }
};
