import { apiSlice } from './reAuth';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTracks: builder.query({
      query: () => 'track/all/',
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Track', id })),
        'Track',
      ],
    }),
    getTrackById: builder.query({
      query: ({ trackId }) => `track/${trackId}/`,
    }),
    getSelectionById: builder.query({
      query: ({selectionId}) => `selection/${selectionId}/`,
      providesTags: (result = []) => [
        ...result.items.map(({ id }) => ({ type: 'Track', id })),
        'Track',
      ],
    }),
    addTrackInFavorite: builder.mutation({
      query: ({ id }) => ({
        url: `track/${id}/favorite/`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Track', id: arg?.id }],
    }),
    removeTrackFromFavorite: builder.mutation({
      query: ({ id }) => ({
        url: `track/${id}/favorite/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Track', id: arg?.id }],
    }),
  }),
});

export const {
  useGetAllTracksQuery,
  useGetTrackByIdQuery,
  useGetSelectionByIdQuery,
  useAddTrackInFavoriteMutation,
  useRemoveTrackFromFavoriteMutation,
} = authApiSlice;
