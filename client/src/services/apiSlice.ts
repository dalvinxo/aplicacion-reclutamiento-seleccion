import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut } from '../features/auth/authSlice';

const baseQuery: TypeBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    return headers;
  },
});

const baseQueryWithReauth: TypeBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  try {
    if (result.error) {
      const error = result.error as { status?: number; message?: string };

      if (error.status === 401) {
        const user = (api.getState() as RootStateGlobal).auth.user;

        if (user) {
          //   const response = await api.endpoints.logOut.initiate();
          await baseQuery('/auth/logout', api, extraOptions);
        }
      }
    }
  } catch (error) {
    api.dispatch(logOut);
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
