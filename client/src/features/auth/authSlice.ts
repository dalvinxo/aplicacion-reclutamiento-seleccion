import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { AuthState, AuthUser } from './authTypes';
import { authApiSlice } from './authApiSlice';

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state, _action) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    ),
      builder.addMatcher(
        authApiSlice.endpoints.logout.matchFulfilled,
        (state, _actions) => {
          state.user = null;
        }
      );
  },
});

export const { setUser, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
