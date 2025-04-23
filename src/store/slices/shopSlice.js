// src/redux/slices/shopSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCategory: "All",
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    },
});

export const { setSelectedCategory } = shopSlice.actions;

export default shopSlice.reducer;