import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  giftItems: [],
  userPurchasedGiftItems: [],
  complimentaryGifts: [],
  eventGiftTrans: null,
  userEventGiftTrans: [],
  sourvernirItems: [],
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
    setUserEventGiftTrans: (state, action) => {
      state.userEventGiftTrans = action.payload;
    },
    setSourvenir: (state, action) => {
      state.sourvernirItems = action.payload;
    },
  },
});

export const {
  setGiftItems,
  setUserPurchasedGifts,
  setUserEventGiftTrans,
  setComplimentaryGifts,
  setEventGiftsTrans,
  setSourvenir,
} = GiftSlice.actions;

export default GiftSlice.reducer;
