import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/user/update",
        method: "PUT",
        body: userData,
      }),
    }),
    recreateAccessToken: builder.mutation({
      query: () => ({
        url: "/user/recreateAccessToken",
        method: "POST",
      }),
    }),

    getAllUsers: builder.query({
      query: ({ page = 1, limit = 10, search = '', role = '' } = {}) => ({
        url: `/user/getAllUsers?page=${page}&limit=${limit}&search=${search}&role=${role}`,
        method: "GET",
      }),
    }),

    // ✅ New: verify email
    verifyEmail: builder.query({
      query: (token) => ({
        url: `/user/verify-email/${token}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useRecreateAccessTokenMutation,
  useGetAllUsersQuery,
  useVerifyEmailQuery, // ✅ Export the hook
} = authApi;
