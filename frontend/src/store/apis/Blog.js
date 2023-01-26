import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BlogApi = createApi({
  reducerPath: 'Blog',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (query) => `/blog${query}`,
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'GET',
      }),
    }),
    createBlog: builder.mutation({
      query: ({ title, content, images }) => ({
        url: `/blog`,
        method: 'POST',
        body: { title, content, images },
      }),
    }),
    createBlogReview: builder.mutation({
      query: ({ id, ratingNum, comment }) => ({
        url: `/blog/reviews`,
        method: 'POST',
        body: { id, ratingNum, comment },
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, title, content, images }) => ({
        url: `/blog/${id}`,
        method: 'PUT',
        body: { title, content, images },
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogReviewMutation,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = BlogApi;

export default BlogApi;
