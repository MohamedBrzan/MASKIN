import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const AdExpireApi = createApi({
  reducerPath: 'AdExpire',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getExpiresTimes: builder.query({
      query: () => '/adExpire',
    }),
  }),
});

export const { useGetExpiresTimesQuery } = AdExpireApi;

export default AdExpireApi;
