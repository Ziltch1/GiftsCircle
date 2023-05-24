import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userPurchasedItems: null,
};

const MarketSlice = createSlice({
  name: 'Market',
  initialState,
  reducers: {
    setUserPurchasedItems: (state, action) => {
      state.userPurchasedItems = action.payload;
    },
  },
});

export const { setUserPurchasedItems } = MarketSlice.actions;

export default MarketSlice.reducer;
