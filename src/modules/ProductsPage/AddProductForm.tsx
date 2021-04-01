import 'react-app-polyfill/ie11';
import React from 'react';
import {Field, Formik, FormikHelpers} from 'formik';
import { Product} from "../../models/types";
import {Button, Col, ModalFooter, Row} from 'reactstrap';
import {addProduct, selectProduct} from '../../reducers';
import Autocomplete from "react-autocomplete";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {AddProductSchema} from "./validationSchema";

const AddProductForm = () => {
    const dispatch = useAppDispatch();
    const fakeProducts = useAppSelector(state => state.productsSlice.fakeProducts);
    const selectedProduct = useAppSelector(state => state.productsSlice.selectedProduct);

    return (
        <div>
            <Formik
                initialValues={{
                    id: 0,
                    name: '',
                    store: '',
                    price: 0,
                    deliveryEstimationDate: '',
                    delivered: false
                }}
                validationSchema={AddProductSchema}
                onSubmit={(
                    values: Product,
                    {setSubmitting, resetForm}: FormikHelpers<Product>
                ) => {
                    setTimeout(() => {
                        dispatch(addProduct({...values, id: Date.now()}));
                        setSubmitting(false);
                        resetForm();
                        dispatch(selectProduct(null));
                    }, 500);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <label htmlFor="name" className="col">
                                    Name
                                    <Autocomplete
                                        menuStyle={{
                                            zIndex: 999,
                                            left: 174.5,
                                            top: 121.5,
                                            minWidth: 177,
                                            borderRadius: 3,
                                            fontSize: '90%',
                                            position: 'fixed',
                                            overflow: 'auto',
                                            maxHeight: '50%'
                                        }}
                                        getItemValue={item => item.title}
                                        items={fakeProducts}
                                        renderItem={(item, isHighlighted) => (
                                            <div
                                                style={{background: isHighlighted ? "lightgray" : "white"}}
                                            >
                                                {item.title}
                                            </div>
                                        )}
                                        value={values.name}
                                        onChange={e => setFieldValue("name", e.target.value)}
                                        onSelect={(val) => {
                                            setFieldValue("name", val);
                                            dispatch(selectProduct(val));
                                        }}
                                    />
                                </label>
                            </Col>
                            <Col>
                                <label htmlFor="store" className="col">
                                    Store
                                    <Field id="store" name="store" placeholder="Amazon"/>
                                </label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label htmlFor="price" className="col">
                                    Price
                                    <Field
                                        id="price"
                                        name="price"
                                        type="number"
                                        value={selectedProduct ? selectedProduct.price : 0}
                                    />
                                </label>
                            </Col>
                            <Col>
                                <label htmlFor="deliveryEstimationDate" className="col">
                                    Estimate delivery time
                                    <Field
                                        id="deliveryEstimationDate"
                                        name="deliveryEstimationDate"
                                        type="date"
                                    />
                                </label>
                            </Col>
                        </Row>
                        <ModalFooter>
                            <Button disabled={isSubmitting} className="btn-primary" type="submit">Add to list</Button>
                        </ModalFooter>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default AddProductForm;
