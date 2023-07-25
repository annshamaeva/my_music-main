import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken, removeUser } from '../store/slices/userSlice';
import { clearTrackId } from '../store/slices/trackSlice';
import { clearFilter } from '../store/slices/filterSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://painassasin.online/catalog',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.access;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: 'https://painassasin.online/user/token/refresh/',
        method: 'POST',
        body: { refresh: localStorage.getItem('refresh') },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      api.dispatch(setToken({ access: refreshResult.data.access }));
      localStorage.setItem('access', refreshResult.data.access);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(removeUser());
      api.dispatch(clearTrackId());
      api.dispatch(clearFilter());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Track'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
