import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { AuthUser } from './authTypes';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthUser, { username: string; password: string }>({
      query: (credentials) => ({
        url: endpoints.auth.login,
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
