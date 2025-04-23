import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // Create order
    createOrder: builder.mutation({
      query: ({ address, contactNumber }) => ({
        url: "/order/create",
        method: "POST",
        body: { address, contactNumber },
      }),
    }),

    // Get orders of logged-in user
    getUserOrders: builder.query({
      query: ({ page = 1, limit = 10, status = "" }) =>
        `/order/getUserOrders?page=${page}&limit=${limit}&status=${status}`,
    }),

    // Get single order by ID
    getOrderById: builder.query({
      query: (id) => `/order/get/${id}`,
    }),

    // Cancel order
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}/cancel`,
        method: "PUT",
      }),
    }),

    // Get all orders (admin access)
    getAllOrders: builder.query({
      query: ({ page = 1, limit = 10, status = "" }) =>
        `/order/getAllOrders?page=${page}&limit=${limit}&status=${status}`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useGetAllOrdersQuery, // 👈 New hook for all orders
} = orderApi;
