import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/slices/authSlice";
import { authApi } from "../api/AuthApi";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware); 
    },
});

export default store;