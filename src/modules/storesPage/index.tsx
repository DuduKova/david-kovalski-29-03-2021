import React from 'react';
import {Row} from "reactstrap";
import {RouteComponentProps} from '@reach/router';
import {useAppSelector} from "../../hooks";
import {Product} from "../../models/types";
import {groupBy, values} from 'lodash';
import StoresTable from '../StoresTable/StoresTable';

const StoresPage: React.FC<RouteComponentProps> = ({children}) => {
    const stores = useAppSelector(state => groupBy(state.productsSlice.products, (product: Product) => {
        return product.store
    }));
    const products = useAppSelector(state => state.productsSlice.products);

    const calcStores = () => {
        return values(stores).map((store: Product[]) => {
            const row = {store: '', quantity: store.length, price: 0};
            const totalPrice = {price: 0};
            store.map((product) => {
                row.store = product.store;
                row.price = row.price + product.price;
                totalPrice.price = totalPrice.price + product.price;
            });
            return row;
        });
    };

    const calcTotalPrice = () => {
        const total = {price: 0};
        products.map((product) => {
            total.price += product.price
        });
        return total.price;
    };

    return (
        <Row>
            <StoresTable stores={calcStores()} totalPrice={calcTotalPrice()}/>
            {children}
        </Row>
    );
};

export default StoresPage;
