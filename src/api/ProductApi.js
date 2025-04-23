import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
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
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
