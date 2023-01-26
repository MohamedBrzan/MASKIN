import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const RealStateApi = createApi({
  reducerPath: 'RealState',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
  }),
  endpoints: (builder) => ({
    getAllRealStates: builder.query({
      query: (query) => `/real-state${query}`,
    }),
    getRealStateById: builder.query({
      query: (id) => `/real-state/${id}`,
    }),
    createRealState: builder.mutation({
      query: ({
        title,
        description,
        images,
        general,
        location,
        dimensions,
        features,
        amenities,
        coordinates,
        propertyStatus,
        placement,
        price,
        urgent,
      }) => ({
        url: '/real-state',
        method: 'POST',
        body: {
          title,
          description,
          images,
          general,
          location,
          dimensions,
          features,
          amenities,
          coordinates,
          propertyStatus,
          placement,
          price,
          urgent,
        },
      }),
    }),
    updateRealState: builder.mutation({
      query: ({
        id,
        title,
        description,
        images,
        general,
        location,
        dimensions,
        features,
        amenities,
        coordinates,
        propertyStatus,
        placement,
        price,
        urgent,
      }) => ({
        url: `/real-state/${id}`,
        method: 'PUT',
        body: {
          title,
          description,
          images,
          general,
          location,
          dimensions,
          features,
          amenities,
          coordinates,
          propertyStatus,
          placement,
          price,
          urgent,
        },
      }),
    }),
    deleteRealState: builder.mutation({
      query: (id) => ({
        url: `/real-state/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllRealStatesQuery,
  useGetRealStateByIdQuery,
  useCreateRealStateMutation,
  useUpdateRealStateMutation,
  useDeleteRealStateMutation,
} = RealStateApi;

export default RealStateApi;
