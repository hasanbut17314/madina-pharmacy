import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "@/api/CartApi";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity } = action.payload;
            const existing = state.items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                state.items.push({ ...product, quantity });
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const itemIndex = state.items.findIndex(item =>
                (item.id === id) || (item.prodId === id)
            );
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity = Math.max(1, quantity);
            }
        },
        removeFromCart: (state, action) => {
            const idToRemove = action.payload;
            state.items = state.items.filter(item =>
                (item.id !== idToRemove) && (item.prodId !== idToRemove)
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        // New action to directly set cart items
        setItems: (state, action) => {
            state.items = Array.isArray(action.payload) ? action.payload : [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                cartApi.endpoints.addItemToCart.matchFulfilled,
                (state, action) => {
                    // Handle different possible response formats
                    if (action.payload?.product) {
                        const { product, quantity } = action.payload;
                        const existing = state.items.find(item => item.id === product.id);
                        if (existing) {
                            existing.quantity += quantity;
                        } else {
                            state.items.push({ ...product, quantity });
                        }
                    } else if (action.payload?.items) {
                        // If API returns updated cart, use that
                        state.items = action.payload.items;
                    } else if (Array.isArray(action.payload)) {
                        // If API returns array directly
                        state.items = action.payload;
                    }
                }
            )
            .addMatcher(
                cartApi.endpoints.removeItemFromCart.matchFulfilled,
                (state, action) => {
                    // Handle different possible response formats
                    if (typeof action.payload === 'number' || typeof action.payload === 'string') {
                        // If API returns just the ID
                        const idToRemove = action.payload;
                        state.items = state.items.filter(item => item.id !== idToRemove);
                    } else if (action.payload?.items) {
                        // If API returns updated cart
                        state.items = action.payload.items;
                    } else if (Array.isArray(action.payload)) {
                        // If API returns array directly
                        state.items = action.payload;
                    }
                }
            )
            .addMatcher(
                cartApi.endpoints.emptyCart.matchFulfilled,
                (state) => {
                    state.items = [];
                }
            )
            .addMatcher(
                cartApi.endpoints.getUserCart.matchFulfilled,
                (state, action) => {
                    console.log("getUserCart response:", action.payload);
                    // Handle different possible response formats
                    if (Array.isArray(action.payload)) {
                        state.items = action.payload;
                    } else if (action.payload?.items) {
                        state.items = action.payload.items;
                    } else if (action.payload?.cartItems) {
                        state.items = action.payload.cartItems;
                    } else if (action.payload?.data) {
                        const data = action.payload.data;
                        state.items = Array.isArray(data) ? data :
                            data.items ? data.items :
                                data.cartItems ? data.cartItems : [];
                    } else {
                        console.warn("Unexpected response format from getUserCart:", action.payload);
                        state.items = [];
                    }
                }
            );
    }
});

// Export actions
export const {
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    setLoading,
    setError,
    setItems
} = cartSlice.actions;

// Selectors with safe fallbacks and type checking
export const selectCartItems = state => {
    const items = state.cart?.items;
    return Array.isArray(items) ? items : [];
};

export const selectCartTotal = state => {
    const items = state.cart?.items;
    if (!Array.isArray(items)) return 0;

    return items.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 0;
        return total + (price * quantity);
    }, 0);
};

export const selectCartItemsCount = state => {
    const items = state.cart?.items;
    if (!Array.isArray(items)) return 0;

    return items.reduce((count, item) => count + (parseInt(item.quantity) || 0), 0);
};

export default cartSlice.reducer;