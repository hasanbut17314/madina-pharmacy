import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
        `/category/getAllCategories?page=${page}&limit=${limit}&search=${search}`,
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
