import React, {useState} from 'react';
import {Button, Col, Nav, NavItem, NavLink, Row} from "reactstrap";
import {RouteComponentProps} from '@reach/router';
import ProductsTable from "./ProductsTable";
import {Product} from "../../models/types";
import CommonModal from "../common/Modal";
import AddProductForm from "./AddProductForm";
import {useAppSelector} from "../../hooks";

const ProductsPage: React.FC<RouteComponentProps> = () => {
    const [modal, setModal] = useState(false);
    const [showDeliveryTab, setShowDeliveryTab] = useState(true);
    const products = useAppSelector(state => state.productsSlice.products.filter((product: Product) => !product.delivered));
    const archives = useAppSelector(state => state.productsSlice.products.filter((product: Product) => product.delivered));
    return (
        <>
            <CommonModal className="" modal={modal} setModal={() => setModal(!modal)}>
                <AddProductForm/>
            </CommonModal>

            <Row className="mb-5">
                <Col s={8} m={9}>
                    <Nav tabs fill>
                        <NavItem>
                            <NavLink active={showDeliveryTab} onClick={() => {
                                setShowDeliveryTab(true);
                            }}>Delivery</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active={!showDeliveryTab} onClick={() => {
                                setShowDeliveryTab(false);
                            }}>Archive items</NavLink>
                        </NavItem>
                    </Nav>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-5">
                <Button className="btn-primary" onClick={() => {
                    setModal(!modal)
                }}>
                    Add item+
                </Button>
            </Row>
            <ProductsTable products={showDeliveryTab ? products : archives}/>
        </>
    );
};

export default ProductsPage;
