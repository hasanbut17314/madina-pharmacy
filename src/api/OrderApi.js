import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ address, contactNumber }) => ({
        url: "/order/create",
        method: "POST",
        body: { address, contactNumber },
      }),
    }),
    getUserOrders: builder.query({
      query: ({ page = 1, limit = 10, status = "" }) =>
        `/order/getUserOrders?page=${page}&limit=${limit}&status=${status}`,
    }),
    getOrderById: builder.query({
      query: (id) => `/order/get/${id}`,
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}/cancel`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
} = orderApi;
