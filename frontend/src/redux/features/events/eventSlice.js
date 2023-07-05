import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: null,
  eventGifts: null,
  editEvent: false,
  eventGuests: null,
  newEvent: JSON.parse(localStorage.getItem('newEvent')) || null,
  loading: true,
  fundRaising: null,
  fundRaisingDonors: null,
  eventAsoebis: [],
  asoebiItems: null,
  eventAsoebiBuyers: null,
  eventMediaFiles: null,
  userUploadedFiles: null,
  guestSentFiles: null,
  eventDeliveryDetails: null,
};

const EventSlice = createSlice({
  name: 'Event',
  initialState,
  reducers: {
    setEditEvent: (state, action) => {
      state.editEvent = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setEventGifts: (state, action) => {
      state.eventGifts = action.payload;
    },
    setEventGuests: (state, action) => {
      state.eventGuests = action.payload;
    },
    setAsoebisItems: (state, action) => {
      state.asoebiItems = action.payload;
    },
    setEventAsoebis: (state, action) => {
      state.eventAsoebis = action.payload;
    },
    setEventAsoebiBuyers: (state, action) => {
      state.eventAsoebiBuyers = action.payload;
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
    setEventMediaFiles: (state, action) => {
      state.eventMediaFiles = action.payload;
    },
    setUserUploadedFiles: (state, action) => {
      state.userUploadedFiles = action.payload;
    },
    setGuestSentFiles: (state, action) => {
      state.guestSentFiles = action.payload;
    },
    setEventDeliveryDetails: (state, action) => {
      state.eventDeliveryDetails = action.payload;
    },
  },
});

export const {
  setEvents,
  setEditEvent,
  setEventGifts,
  setEventGuests,
  setAsoebisItems,
  setEventAsoebis,
  setEventAsoebiBuyers,
  setNewEvent,
  setLoading,
  setFundRaising,
  setFundRaisingDonors,
  setEventMediaFiles,
  setGuestSentFiles,
  setEventDeliveryDetails,
  setUserUploadedFiles,
} = EventSlice.actions;

export default EventSlice.reducer;
