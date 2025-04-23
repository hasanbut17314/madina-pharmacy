import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/slices/authSlice";
import { authApi } from "../api/AuthApi";
import shopSlice from "../store/slices/shopSlice";
import { productApi } from "../api/ProductApi";
const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
        shop: shopSlice,
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware, productApi.middleware);
    },
});

export default store;