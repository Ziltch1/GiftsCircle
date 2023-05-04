import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: null,
  eventGifts: null,
  newEvent: JSON.parse(localStorage.getItem('newEvent')) || null,
  loading: true,
  fundRaising: null,
  fundRaisingDonors: null,
  eventAsoebis: null,
  asoebiItems: null
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
    setAsoebisItems: (state, action) => {
      state.asoebiItems = action.payload;
    },
    setEventAsoebis: (state, action) => {
      state.eventAsoebis = action.payload;
    },
    setNewEvent: (state, action) => {
      state.newEvent = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFundRaising: (state, action) => {
      state.fundRaising = action.payload;
    },
    setFundRaisingDonors: (state, action) => {
      state.fundRaisingDonors = action.payload;
    },
  },
});

export const {
  setEvents,
  setEventGifts,
  setAsoebisItems,
  setEventAsoebis,
  setNewEvent,
  setLoading,
  setFundRaising,
  setFundRaisingDonors,
} = EventSlice.actions;

export default EventSlice.reducer;
