import moment, {MomentInput} from 'moment';

export const formatCurrency = (currency: string) => {
    switch (currency.toLocaleUpperCase()) {
        case 'USD':
            return '$';
        case 'ILS':
            return '₪';
        default:
            return currency;
    }
};

export const parseMoment = (date: MomentInput) => moment.utc(date);

export const formatLongDate = (date: MomentInput) => {
    return date ? parseMoment(date).format('LL') : '-';
};
