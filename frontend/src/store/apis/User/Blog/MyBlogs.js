import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const MyBlogsApi = createApi({
  reducerPath: 'MyBlogs',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/user',
  }),
  endpoints: (builder) => ({
    getMyBlogs: builder.query({
      query: (query) => `/blogs${query}`,
    }),
  }),
});

export const { useGetMyBlogsQuery,  } = MyBlogsApi;

export default MyBlogsApi;
