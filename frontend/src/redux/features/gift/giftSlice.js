import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  giftItems: [],
  userGiftItems : []
};

const GiftSlice = createSlice({
  name: 'Gift',
  initialState,
  reducers: {
    setGiftItems: (state, action) => {
      state.giftItems = action.payload;
    },
    setUserPurchasedGifts: (state, action) => {
      state.userGiftItems = action.payload;
    },
  },
});

export const { setGiftItems, setUserPurchasedGifts } = GiftSlice.actions;

export default GiftSlice.reducer;
