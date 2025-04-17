import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetProductByIdQuery,
  useGetAllProductsQuery,
  useGetProductsForUserQuery,
} = productApi;
