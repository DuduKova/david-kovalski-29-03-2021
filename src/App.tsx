import React, {useEffect} from 'react';
import {Container} from 'reactstrap';
import './styles/index.scss';
import Navbar from "./modules/navbar";
import ProductsPage from "./modules/ProductsPage";
import {Router} from '@reach/router';
import StoresPage from './modules/storesPage';
import {ScrollToTop} from './ScrollToTop';
import {useAppDispatch, useAppSelector} from "./hooks";
import {getFakeProducts, getRates} from "./reducers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
    const currency = useAppSelector(state => state.productsSlice.currency);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRates(currency));

        const interval = setInterval(() => {
            dispatch(getRates(currency));
        },1000 * 10);

        return () => {
            clearInterval(interval);
        }
    }, [currency]);

    useEffect(() => {
        dispatch(getFakeProducts());
    }, []);
    return (
        <Container>
            <ToastContainer
                limit={2}
                pauseOnFocusLoss
                closeButton
            />
            <Navbar/>
            <Router>
                <ScrollToTop path="/">
                    <ProductsPage default path="/"/>
                    <StoresPage path="/stores"/>
                </ScrollToTop>
            </Router>
        </Container>
    );
}

export default App;
