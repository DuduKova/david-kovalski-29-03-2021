import {Currency} from "../models/types";
import {defaultILSRate} from "./constans";

export const calcRates = (currency: Currency, price: number, rate:number = defaultILSRate) => {
return currency === 'USD' ? price : (price * rate).toFixed(2);
};
