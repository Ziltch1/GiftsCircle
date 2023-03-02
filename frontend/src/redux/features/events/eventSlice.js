import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  eventGifts: [],
  newEvent: null,
  loading: true,
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
    setNewEvent: (state, action) => {
      state.newEvent = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setEvents, setEventGifts, setNewEvent, setLoading } =
  EventSlice.actions;

export default EventSlice.reducer;
