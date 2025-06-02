import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // Existing endpoints...

    getProductById: builder.query({
      query: (id) => `/product/getProductById/${id}`,
    }),

    getAllProducts: builder.query({
      query: ({ page = 1, limit = 10, search = "", category = "" }) =>
        `/product/getAllProducts?page=${page}&limit=${limit}&search=${search}&category=${category}`,
    }),

    getProductsForUser: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        category = "",
        isFeatured = false,
      }) =>
        `/product/getProductsForUser?page=${page}&limit=${limit}&search=${search}&category=${category}&isFeatured=${isFeatured}`,
    }),

    getProductsForUsers: builder.query({
      query: ({ page = 1, limit = 10, search = "", category = "" }) =>
        `/product/getProductsForUser?page=${page}&limit=${limit}&search=${search}&category=${category}`,
    }),

    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/add",
        method: "POST",
        body: formData,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/update/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
    }),

    // New analytics endpoints

    getTotalAnalytics: builder.query({
      query: () => `/analytics/totalAnalytics`,
    }),

    getRecentOrders: builder.query({
      query: () => `/analytics/recentOrders`,
    }),

    getMonthlySalesOverview: builder.query({
      query: () => `/analytics/getMonthlySalesOverview`,
    }),

    getSalesByCategory: builder.query({
      query: () => `/analytics/salesByCategory`,
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetAllProductsQuery,
  useGetProductsForUserQuery,
  useGetProductsForUsersQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

  // Export hooks for new analytics endpoints
  useGetTotalAnalyticsQuery,
  useGetRecentOrdersQuery,
  useGetMonthlySalesOverviewQuery,
  useGetSalesByCategoryQuery,
} = productApi;
