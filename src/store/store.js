import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/slices/authSlice";
import { authApi } from "../api/AuthApi";
import shopSlice from "../store/slices/shopSlice";
import { productApi } from "../api/ProductApi";
import { cartApi } from "../api/CartApi";
import { categoryApi } from "../api/CatApi";
import { orderApi } from "../api/OrderApi";
const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
        shop: shopSlice,
        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, cartApi.middleware, categoryApi.middleware, orderApi.middleware);
    },
});

export default store;