import 'react-app-polyfill/ie11';
import React from 'react';
import {ErrorMessage, Field, Formik} from 'formik';
import {Product} from "../../models/types";
import {Button, Col, ModalFooter, Row} from 'reactstrap';
import {addProduct, selectProduct} from '../../reducers';
import Autocomplete from "react-autocomplete";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {AddProductSchema} from "./validationSchema";
import ValidationMessage from "./ValidationMessage";

type ProductForm = Partial<Product>;

const AddProductForm = () => {
    const dispatch = useAppDispatch();
    const fakeProducts = useAppSelector(state => state.productsSlice.fakeProducts);
    const selectedProduct = useAppSelector(state => state.productsSlice.selectedProduct);

    const initialFormValues = {
        id: selectedProduct?.id,
        name: selectedProduct?.title || '',
        store: '',
        price: selectedProduct?.price || 0,
        deliveryEstimationDate: '',
        delivered: false
    };

    return (
        <div>
            <Formik<ProductForm>
                enableReinitialize
                initialValues={initialFormValues}
                validationSchema={AddProductSchema}
                onSubmit={(
                    values,
                    {setSubmitting, resetForm}
                ) => {
                    dispatch(addProduct({...values, id: Date.now()} as Product));
                    dispatch(selectProduct(null));
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({
                      values,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <label htmlFor="name" className="col">
                                    Name
                                    <Autocomplete
                                        menuStyle={{
                                            zIndex: 999,
                                            right: 174.5,
                                            top: 121.5,
                                            width: 500,
                                            borderRadius: 3,
                                            fontSize: '90%',
                                            position: 'fixed',
                                            overflow: 'auto',
                                            maxHeight: '50%'
                                        }}
                                        getItemValue={item => item.title}
                                        shouldItemRender={(item, value) => {
                                            return item.title.toUpperCase().includes(value.toUpperCase())
                                        }}
                                        items={fakeProducts}
                                        renderItem={(item, isHighlighted) => (
                                            <div style={{background: isHighlighted ? "lightgray" : "white"}}>
                                                {item.title}
                                            </div>
                                        )}
                                        value={values.name}
                                        onChange={e => setFieldValue("name", e.target.value)}
                                        onSelect={async (val) => {
                                            setFieldValue("name", val);
                                            dispatch(selectProduct(val));
                                        }}
                                    />
                                    <ErrorMessage name="name"
                                                  render={() => <ValidationMessage message="Required"/>}/>
                                </label>
                            </Col>
                            <Col>
                                <label htmlFor="store" className="col">
                                    Store
                                    <Field id="store" name="store" placeholder="Amazon"/>
                                    <ErrorMessage name="store"
                                                  render={() => <ValidationMessage message="Required"/>}/>
                                </label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <label htmlFor="price" className="col">
                                    Price in $
                                    <Field
                                        id="price"
                                        name="price"
                                        type="number"
                                    />
                                    <ErrorMessage name="price"
                                                  render={() => <ValidationMessage message="Required"/>}/>
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
                                    <ErrorMessage name="deliveryEstimationDate"
                                                  render={() => <ValidationMessage message="Required"/>}/>
                                </label>
                            </Col>
                        </Row>
                        <ModalFooter className="mt-5">
                            <Button disabled={isSubmitting} className="btn-primary" type="submit">Add to list</Button>
                        </ModalFooter>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default AddProductForm;
