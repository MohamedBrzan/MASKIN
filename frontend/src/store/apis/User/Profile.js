import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ProfileApi = createApi({
  reducerPath: 'Profile',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/user' }),
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => '/me',
    }),
    getMyRealStatesFavorites: builder.query({
      query: () => '/real-states/favorites',
    }),
    updateMyProfile: builder.mutation({
      query: (userData) => ({
        url: `/me`,
        method: 'PUT',
        body: { ...userData },
      }),
    }),
    createView: builder.mutation({
      query: (id) => ({
        url: `/views`,
        method: 'POST',
        body: id,
      }),
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useGetMyRealStatesFavoritesQuery,
  useUpdateMyProfileMutation,
  useCreateViewMutation,
} = ProfileApi;

export default ProfileApi;
