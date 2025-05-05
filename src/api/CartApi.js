import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    addItemToCart: builder.mutation({
      query: (id) => ({
        url: `/cart/addItem/${id}`,
        method: "POST",
      }),
    }),
    incrementCartItem: builder.mutation({
      query: (id) => ({
        url: `/cart/increment/${id}`,
        method: "PUT",
      }),
    }),
    decrementCartItem: builder.mutation({
      query: (id) => ({
        url: `/cart/decrement/${id}`,
        method: "PUT",
      }),
    }),
    removeItemFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/removeItem/${id}`,
        method: "DELETE",
      }),
    }),
    emptyCart: builder.mutation({
      query: () => ({
        url: `/cart/empty`,
        method: "DELETE",
      }),
    }),
    getUserCart: builder.query({
      query: () => `/cart/getUserCart`,
    }),
  }),
});

export const {
  useAddItemToCartMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
  useRemoveItemFromCartMutation,
  useEmptyCartMutation,
  useGetUserCartQuery,
} = cartApi;
