import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import productsSlice from '../reducers/index';

export const store = configureStore({
    reducer: {
        productsSlice
    },
    devTools: true
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
