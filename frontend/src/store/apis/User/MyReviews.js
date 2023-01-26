import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const MyReviewsApi = createApi({
  reducerPath: 'MyReviews',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/user',
  }),
  endpoints: (builder) => ({
    getMyReviews: builder.query({
      query: () => '/reviews',
    }),
  }),
});

export const { useGetMyReviewsQuery } = MyReviewsApi;

export default MyReviewsApi;
