import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // Get product by ID
    getProductById: builder.query({
      query: (id) => `/product/getProductById/${id}`,
    }),

    // Get all products
    getAllProducts: builder.query({
      query: ({ page = 1, limit = 10, search = "", category = "" }) =>
        `/product/getAllProducts?page=${page}&limit=${limit}&search=${search}&category=${category}`,
    }),

    // Get products for users (filtered, featured)
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
      query: ({
        page = 1,
        limit = 10,
        search = "",
        category = "",
      }) =>
        `/product/getProductsForUser?page=${page}&limit=${limit}&search=${search}&category=${category}`,
    }),

    // Add a new product
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/add",
        method: "POST",
        body: formData,
      }),
    }),

    // Update a product by ID
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/update/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),

    // Delete a product by ID
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
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
} = productApi;
