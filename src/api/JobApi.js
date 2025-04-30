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

    // Submit an application for a job
    submitApplication: builder.mutation({
      query: ({ jobId, fullName, email, phone, coverLetter, resume }) => ({
        url: "/job/submitApplication",
        method: "POST",
        body: { jobId, fullName, email, phone, coverLetter, resume },
      }),
    }),

    // Get an application by ID
    getApplicationById: builder.query({
      query: (id) => `/job/getApplicationById/${id}`,
    }),

    // Update the application status
    updateApplicationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/job/updateApplicationStatus/${id}`,
        // status is like  ['pending', 'reviewing', 'interviewed', 'selected', 'rejected']
        method: "PUT",
        body: { status },
      }),
    }),

    // Get all applications with pagination, status, and search filter
    getAllApplications: builder.query({
      query: ({ page = 1, limit = 10, jobId = "", status = "pending", search = "" }) =>
        `/job/getAllApplications?page=${page}&limit=${limit}&jobId=${jobId}&status=${status}&search=${search}`,
    }),

    // Delete an application by ID
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/job/deleteApplication/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useGetJobByIdQuery,
  useGetAllJobsQuery,
  useSubmitApplicationMutation,
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
  useGetAllApplicationsQuery,
  useDeleteApplicationMutation,
} = jobApi;
