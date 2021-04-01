export type Currency = 'USD' | 'ILS';

export enum currencyToSymbol {
    USD = '$',
    ILS = '₪'
}

export interface FakeStoreProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface Product {
    id: number;
    name: string;
    store: string;
    price: number;
    deliveryEstimationDate: string;
    delivered: boolean;
}


export interface Store {
    store: string;
    quantity: number
    price: number;
}

