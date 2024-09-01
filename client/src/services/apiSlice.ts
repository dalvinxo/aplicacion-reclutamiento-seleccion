import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut } from '../features/auth/authSlice';
import { endpoints } from './endpoints';
import { RootState } from '../store';
import { DEV, VITE_VERSION_API } from '../constants/config';

const baseQuery: TypeBaseQuery = fetchBaseQuery({
  baseUrl: DEV ? VITE_VERSION_API : 'http://localhost:3000/api/',
  credentials: 'include',
});

const baseQueryWithReauth: TypeBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  try {
    if (result.error) {
      const error = result.error as { status?: number; message?: string };

      if (error.status === 401) {
        const user = (api.getState() as RootState).auth.user;

        if (user) {
          await baseQuery(endpoints.auth.logout, api, extraOptions);
        }
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    api.dispatch(logOut({}));
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
