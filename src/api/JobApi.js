import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Adjust base URL if necessary
  endpoints: (builder) => ({
    // Create a new job
    createJob: builder.mutation({
      query: ({ title, description, requirements, salary }) => ({
        url: "/job/create",
        method: "POST",
        body: { title, description, requirements, salary },
      }),
    }),

    // Update a job by ID
    updateJob: builder.mutation({
      query: ({ id, title, description, requirements, salary }) => ({
        url: `/job/update/${id}`,
        method: "PUT",
        body: { title, description, requirements, salary },
      }),
    }),

    // Delete a job by ID
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/job/delete/${id}`,
        method: "DELETE",
      }),
    }),

    // Get a job by ID
    getJobById: builder.query({
      query: (id) => `/job/getJobById/${id}`,
    }),

    // Get all jobs with pagination and search filter
    getAllJobs: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
        `/job/getAllJobs?page=${page}&limit=${limit}&search=${search}`,
    }),
  }),
});

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetJobByIdQuery,
  useGetAllJobsQuery,
} = jobApi;
