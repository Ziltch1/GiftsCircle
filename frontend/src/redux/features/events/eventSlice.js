import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  eventGifts: [],
};

const EventSlice = createSlice({
  name: 'Event',
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

export const { setEvents, setEventGifts } = EventSlice.actions;

export default EventSlice.reducer;
