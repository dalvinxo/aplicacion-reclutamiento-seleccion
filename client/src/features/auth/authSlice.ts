import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { AuthState } from './authTypes';

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
  },
});

export const { logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
