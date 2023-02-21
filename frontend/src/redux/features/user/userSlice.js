import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  eventGifts: [],
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setEventGifts: (state, action) => {
      state.eventGifts = action.payload;
    },
  },
});

export const { setEvents, setEventGifts } = UserSlice.actions;

export default UserSlice.reducer;
