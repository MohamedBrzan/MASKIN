import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const MyMessagesApi = createApi({
  reducerPath: 'MyMessages',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/user',
  }),
  endpoints: (builder) => ({
    getMyMessages: builder.query({
      query: () => '/messages',
    }),

    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/`,
        method: 'DELETE',
        body: {
          id,
        },
      }),
    }),
  }),
});

export const { useGetMyMessagesQuery, useDeleteMessageMutation } =
  MyMessagesApi;

export default MyMessagesApi;
