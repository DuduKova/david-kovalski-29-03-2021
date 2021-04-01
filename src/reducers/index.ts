import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Currency, FakeStoreProduct, Product} from "../models/types";
import fakestoreApi from "../api/fakestoreApi";
import {formatFakeToProduct} from "../utils/formatting";
import exchangeratesApi from "../api/exchangeratesApi";
import {defaultILSRate, defaultUSDRate} from "../utils/constans";

interface MyProductsState {
    products: Product[],
    fakeProducts: FakeStoreProduct[],
    selectedProduct: Product | null,
    currency: Currency,
    isLoading: boolean,
    rate: number,
}

const initialState = { products: [], fakeProducts: [], selectedProduct: null, isLoading: false, currency: 'USD', rate: 1 } as MyProductsState;

export const getFakeProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        try {
            const {data} = await fakestoreApi.get<FakeStoreProduct[]>('');
            return data
        } catch (e) {
            console.error(e)
        }
    }
);

export const getRates = createAsyncThunk(
    'products/getRates',
    async (currency: Currency) => {
        try {
            const {data} = await exchangeratesApi.get<{rates: {USD: number, ILS: number}}>(`${currency}`);
            if (!data.rates) {
                // this api returns success 200 when fails, so default values applied here
                return currency === 'USD' ? defaultILSRate : defaultUSDRate;
            }
            if (data.rates.USD === 1) {
                return data.rates.ILS
            }
            return data.rates.USD
        } catch (e) {
            console.error(e)
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        selectProduct(state: MyProductsState, action: PayloadAction<string | null>) {
            const selected = state.fakeProducts.find((fakeProduct) => fakeProduct.title === action.payload);
            state.selectedProduct = selected ? formatFakeToProduct(selected) : null;
        },
        addProduct(state: MyProductsState, action: PayloadAction<Product>) {
            state.products.push({...action.payload, price: state.selectedProduct!.price})
        },
        archiveProduct(state, action: PayloadAction<Product>) {
            state.products.find((product) => product.id === action.payload.id)!.delivered = !action.payload.delivered;
        },
        setCurrency(state, action: PayloadAction<Currency>) {
            state.currency = action.payload
        },
    },
    extraReducers: {
        [getFakeProducts.fulfilled.toString()]: (state, action) => {
            state.fakeProducts = action.payload
        },
        [getRates.fulfilled.toString()]: (state, action) => {
            state.rate = action.payload
        }
    }
});

export const { addProduct, archiveProduct, selectProduct, setCurrency } = productsSlice.actions;
export default productsSlice.reducer
