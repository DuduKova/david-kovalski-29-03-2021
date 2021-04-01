import React from 'react';
import {Col, Row, Table} from 'reactstrap';
import {Store} from "../../models/types";
import {useAppSelector} from "../../hooks";
import {formatCurrency} from "../../utils/formatting";
import {calcRates} from "../../utils/calcRates";

const StoresTable = ({stores, totalPrice}: { stores: Store[], totalPrice: number }) => {
    const currency = useAppSelector(state => state.productsSlice.currency);
    const rate = useAppSelector(state => state.productsSlice.rate);
    return (
        <>
            <Table borderless responsive hover>
                <thead>
                <tr>
                    <th>Store</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {stores.length ? stores.map((store: Store, i: number) => {
                    return <tr key={i}>
                        <td>{store.store}</td>
                        <td>x{store.quantity}</td>
                        <td>{formatCurrency(currency)}{calcRates(currency, store.price, rate)}</td>
                    </tr>
                }) : <h2 className="text-center w-100">No products added.</h2>}
                </tbody>
            </Table>
            <Row className="w-100 justify-content-end mt-5">
                <Col sm={3} className="border-bottom border-dark">
                    <p className="d-flex justify-content-end">Total
                        price: <span className="ml-auto">{formatCurrency(currency)}{calcRates(currency, totalPrice, rate)}</span></p>
                </Col>
            </Row>
        </>
    );
};

export default StoresTable;
