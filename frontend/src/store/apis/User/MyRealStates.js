import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const MyRealStatesApi = createApi({
  reducerPath: 'MyRealStates',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/user',
  }),
  endpoints: (builder) => ({
    getMyRealStates: builder.query({
      query: (query) => `/real-states${query}`,
    }),
  }),
});

export const { useGetMyRealStatesQuery } = MyRealStatesApi;

export default MyRealStatesApi;
