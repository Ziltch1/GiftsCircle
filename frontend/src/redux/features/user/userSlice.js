import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(sessionStorage.getItem('user')) || null,
  deliveryDetails: null,
  notifications: [],
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setDeliveryDetails: (state, action) => {
      state.deliveryDetails = action.payload;
    },
    setUserNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { setUser, setDeliveryDetails, setUserNotifications } =
  UserSlice.actions;

export default UserSlice.reducer;
