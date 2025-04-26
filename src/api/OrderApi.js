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

    // Assign rider to order
    assignRider: builder.mutation({
      query: ({ orderId, riderId }) => ({
        url: "/order/assign",
        method: "POST",
        body: { orderId, riderId },
      }),
    }),

    // Get orders assigned to a specific rider
    getRiderOrders: builder.query({
      query: ({ page = 1, limit = 10, status = "" }) =>
        `/order/rider/getOrders?page=${page}&limit=${limit}&status=${status}`,
    }),

    // 🚀 Corrected: Update order status by Rider (send status in body)
    updateOrderStatusByRider: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/rider/${id}/updateStatus`,
        method: "PUT",
        body: { status },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useGetAllOrdersQuery,
  useAssignRiderMutation,
  useGetRiderOrdersQuery,
  useUpdateOrderStatusByRiderMutation,
} = orderApi;
