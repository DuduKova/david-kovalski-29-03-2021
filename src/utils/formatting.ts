import {FakeStoreProduct} from "../models/types";
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

export const formatFakeToProduct = (fakeStoreProduct: FakeStoreProduct) => {
    return {
        id: fakeStoreProduct.id,
    name: fakeStoreProduct.title,
    store: 'Amazon',
    price: fakeStoreProduct.price,
    deliveryEstimationDate: formatLongDate(Date.now()),
    delivered: false
    }
};
