import { apiSlice } from '../../services/apiSlice';
import { endpoints } from '../../services/endpoints';
import { AuthUser, UserSimple } from './authTypes';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthUser, { username: string; password: string }>({
      query: (credentials) => ({
        url: endpoints.auth.login,
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation<
      UserSimple,
      { username: string; password: string; email: string }
    >({
      query: (credentials) => ({
        url: endpoints.auth.signup,
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: endpoints.auth.logout,
        method: 'POST',
      }),
    }),
    getUser: builder.query<AuthUser, void>({
      query: () => endpoints.auth.user,
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApiSlice;
