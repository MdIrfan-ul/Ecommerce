import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/ProductsReducer';
import cartReducer from '../features/cartReducer';


export const store = configureStore({
  reducer: {
    products:productsReducer,
    carts:cartReducer
  },
});
