import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: null,
  eventGifts: null,
  newEvent: JSON.parse(localStorage.getItem('newEvent')) || null,
  loading: true,
  fundRaising : null
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
    setFundRaising : (state, action) => {
      state.fundRaising = action.payload;
    },
  },
});

export const { setEvents, setEventGifts, setNewEvent, setLoading, setFundRaising } =
  EventSlice.actions;

export default EventSlice.reducer;
