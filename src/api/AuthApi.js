import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // Register user
    register: builder.mutation({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Logout
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),

    // Update current user info (authenticated user)
    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/user/update",
        method: "PUT",
        body: userData,
      }),
    }),

    // Recreate access token
    recreateAccessToken: builder.mutation({
      query: () => ({
        url: "/user/recreateAccessToken",
        method: "POST",
      }),
    }),

    // Get all users
    getAllUsers: builder.query({
      query: ({ page = 1, limit = 10, search = '', role = '' } = {}) => ({
        url: `/user/getAllUsers?page=${page}&limit=${limit}&search=${search}&role=${role}`,
        method: "GET",
      }),
    }),

    // Verify email by token
    verifyEmail: builder.query({
      query: (token) => ({
        url: `/user/verify-email/${token}`,
        method: "GET",
      }),
    }),

    // ✅ Add a new user (Admin-level endpoint)
    addUser: builder.mutation({
      query: (newUserData) => ({
        url: "/user/addUser",
        method: "POST",
        body: newUserData, // expects: { firstName, lastName, email, role, password, confirmPassword }
      }),
    }),

    // ✅ Update a user's info (Admin or self)
    updateUserInfo: builder.mutation({
      query: (updatedUserData) => ({
        url: "/user/update",
        method: "PUT",
        body: updatedUserData, // expects: { firstName, lastName, email }
      }),
    }),
  }),
});

// Export hooks
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useRecreateAccessTokenMutation,
  useGetAllUsersQuery,
  useVerifyEmailQuery,
  useAddUserMutation,          // ✅ New
  useUpdateUserInfoMutation,   // ✅ New
} = authApi;
