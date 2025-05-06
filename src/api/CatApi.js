import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // Get all categories
    getAllCategories: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
        `/category/getAllCategories?page=${page}&limit=${limit}&search=${search}`,
    }),

    // Add category (POST)
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/category/add",
        method: "POST",
        body: formData,
      }),
    }),

    // Update category by ID (PUT)
    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/category/update/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),

    // Delete category by ID (DELETE)
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
