import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const GetUserByIdApi = createApi({
  reducerPath: 'GetUserById',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/user',
  }),
  endpoints: (builder) => ({
    getGetUserByIdById: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetGetUserByIdByIdQuery } = GetUserByIdApi;
export default GetUserByIdApi;
