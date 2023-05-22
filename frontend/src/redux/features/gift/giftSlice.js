import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  giftItems: [],
  userPurchasedGiftItems: [],
  complimentaryGifts: [],
  eventGiftTrans: [],
};

const GiftSlice = createSlice({
  name: 'Gift',
  initialState,
  reducers: {
    setGiftItems: (state, action) => {
      state.giftItems = action.payload;
    },
    setComplimentaryGifts: (state, action) => {
      state.complimentaryGifts = action.payload;
    },
    setUserPurchasedGifts: (state, action) => {
      state.userPurchasedGiftItems = action.payload;
    },
    setEventGiftsTrans: (state, action) => {
      state.eventGiftTrans = action.payload;
    },
  },
});

export const {
  setGiftItems,
  setUserPurchasedGifts,
  setComplimentaryGifts,
  setEventGiftsTrans,
} = GiftSlice.actions;

export default GiftSlice.reducer;
