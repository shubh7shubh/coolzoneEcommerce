import { configureStore, createReducer } from '@reduxjs/toolkit';
import productReducer from '../components/product/productSlice';
import authReducer from '../components/auth/authSlice';
import cartReducer from '../components/cart/cartSlice';
// import orderReducer from '../features/order/orderSlice';
// import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    // order: orderReducer,
    // user: userReducer,
  },
});
