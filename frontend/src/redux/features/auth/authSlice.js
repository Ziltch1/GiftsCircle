import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: sessionStorage.getItem('accessToken') || null,
  user: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setUser } = AuthSlice.actions;

export default AuthSlice.reducer;
