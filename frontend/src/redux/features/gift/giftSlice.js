import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  giftItems: [],
  userPurchasedGiftItems : []
};

const GiftSlice = createSlice({
  name: 'Gift',
  initialState,
  reducers: {
    setGiftItems: (state, action) => {
      state.giftItems = action.payload;
    },
    setUserPurchasedGifts: (state, action) => {
      state.userPurchasedGiftItems = action.payload;
    },
  },
});

export const { setGiftItems, setUserPurchasedGifts } = GiftSlice.actions;

export default GiftSlice.reducer;
