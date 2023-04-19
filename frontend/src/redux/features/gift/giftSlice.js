import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  giftItems: [],
  userPurchasedGiftItems: [],
  complimentaryGifts: [],
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
  },
});

export const { setGiftItems, setUserPurchasedGifts, setComplimentaryGifts } = GiftSlice.actions;

export default GiftSlice.reducer;
