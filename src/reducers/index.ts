import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Currency, FakeStoreProduct, Product} from "../models/types";
import fakestoreApi from "../api/fakestoreApi";
import exchangeratesApi from "../api/exchangeratesApi";
import {defaultILSRate, defaultUSDRate} from "../utils/constans";
import {toast} from 'react-toastify';

interface MyProductsState {
    products: Product[],
    fakeProducts: FakeStoreProduct[],
    selectedProduct: FakeStoreProduct | null,
    currency: Currency,
    isLoading: boolean,
    rate: number,
    apiHasReachLimit: boolean
}

const initialState = {
    products: [],
    fakeProducts: [],
    selectedProduct: null,
    isLoading: false,
    currency: 'USD',
    rate: 1,
    apiHasReachLimit: false
} as MyProductsState;

export const getFakeProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        try {
            const {data} = await fakestoreApi.get<FakeStoreProduct[]>('');
            return data
        } catch (e) {
            toast('cant get products try again later');
            console.error(e)
        }
    }
);

export const getRates = createAsyncThunk(
    'products/getRates',
    async (currency: Currency, {
        getState, dispatch
    }) => {
        // @ts-ignore
        if (getState().productsSlice.apiHasReachLimit) {
            return;
        }
        const {data} = await exchangeratesApi.get<{ rates: { USD: number, ILS: number } }>(`${currency}`);
        if (!data.rates) {
            dispatch(setError());
            // this api returns success 200 when fails, so default values applied here
            toast.error('rates api is not working right now, we will try again later.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            throw new Error('Failed to get rates');
        }
        if (data.rates.USD === 1) {
            return data.rates.ILS
        }
        return data.rates.USD
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        selectProduct(state: MyProductsState, action: PayloadAction<string | null>) {
            if (action.payload) {
                const selected = state.fakeProducts.find((fakeProduct) => fakeProduct.title === action.payload);
                state.selectedProduct = selected!;
            } else {
                state.selectedProduct = null;
            }
        },
        addProduct(state: MyProductsState, action: PayloadAction<Product>) {
            toast.success('Product added');
            state.products.push({...action.payload})
        },
        archiveProduct(state, action: PayloadAction<Product>) {
            state.products.find((product) => product.id === action.payload.id)!.delivered = !action.payload.delivered;
        },
        setCurrency(state, action: PayloadAction<Currency>) {
            state.currency = action.payload
        },
        setError(state) {
            state.apiHasReachLimit = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRates.rejected, (state, action) => {
            state.apiHasReachLimit = true;
            state.rate = state.currency === 'USD' ? defaultILSRate : defaultUSDRate;
        }).addCase(getFakeProducts.fulfilled, (state, action) => {
            if (action.payload) {
                state.fakeProducts = action.payload
            }
        }).addCase(getRates.fulfilled, (state, action) => {
            if (action.payload) {
                state.rate = action.payload;
            }
        })
    }
});

export const {addProduct, archiveProduct, selectProduct, setCurrency, setError} = productsSlice.actions;
export default productsSlice.reducer
