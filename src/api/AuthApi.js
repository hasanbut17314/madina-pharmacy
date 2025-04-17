import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    register: builder.mutation({ // when call this mutation then send data like this {firstName lastName email password confirmPassword}
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({ // when call this mutation then send data like this {email password}
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
    updateUser: builder.mutation({ // when call this mutation then send data like this {firstName lastName email}
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
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useRecreateAccessTokenMutation,
} = authApi;
