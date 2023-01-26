import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const AdApi = createApi({
  reducerPath: 'AdApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: () => '/ad',
    }),
    getAdById: builder.mutation({
      query: (id) => ({
        url: `/ad/${id}`,
        method: 'GET',
      }),
    }),
    createAd: builder.mutation({
      query: ({ realStateInfo, adInfo, nationalAccess }) => ({
        url: `/ad`,
        method: 'POST',
        body: { realStateInfo, adInfo, nationalAccess },
      }),
    }),
    deleteAd: builder.mutation({
      query: (id) => ({
        url: `/ad`,
        method: 'DELETE',
        body: id,
      }),
    }),
  }),
});

export const {
  useGetAllAdsQuery,
  useGetAdByIdMutation,
  useCreateAdMutation,
  useDeleteAdMutation,
} = AdApi;

export default AdApi;
