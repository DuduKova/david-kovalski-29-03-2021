import React from 'react';
import {Button, Table} from 'reactstrap';
import {Product} from "../../models/types";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {archiveProduct} from '../../reducers';
import styles from './ProductsTable.module.scss';
import {formatCurrency, formatLongDate} from "../../utils/formatting";
import {calcRates} from "../../utils/calcRates";

const ProductsTable = ({products}: { products: Array<Product> }) => {
    const dispatch = useAppDispatch();
    const currency = useAppSelector(state => state.productsSlice.currency);
    const rate = useAppSelector(state => state.productsSlice.rate);
    return (
        <Table borderless responsive hover className="swing-in-top-fwd">
            <thead className={styles.tableHeader}>
            <tr>
                <th>Name</th>
                <th>Store</th>
                <th>Price</th>
                <th>Delivery estimate</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product, i) => {
                return <tr key={i} className={`${i % 2 === 0 && styles.bgRow} ${styles.tableRows}`}>
                    <td>{product.name}</td>
                    <td className={styles.smallColumn}>{product.store}</td>
                    <td className={styles.smallColumn}>{calcRates(currency, product.price, rate)} {formatCurrency(currency)}</td>
                    <td className={styles.smallColumn}>{formatLongDate(product.deliveryEstimationDate)}</td>
                    <td className={styles.smallColumn}><Button className="btn-outline" onClick={() => {
                        dispatch(archiveProduct(product))
                    }}>{product.delivered ? 'Reactive' : 'Archive'}</Button></td>
                </tr>
            })}
            </tbody>
        </Table>
    );
};

export default ProductsTable;
