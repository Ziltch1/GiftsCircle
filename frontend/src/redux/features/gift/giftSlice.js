import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  giftItems: [],
};

const GiftSlice = createSlice({
  name: 'Gift',
  initialState,
  reducers: {
    setGiftItems: (state, action) => {
      state.giftItems = action.payload;
    },
  },
});

export const { setGiftItems } = GiftSlice.actions;

export default GiftSlice.reducer;
