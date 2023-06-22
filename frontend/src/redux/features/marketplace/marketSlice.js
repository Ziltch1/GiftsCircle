import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userPurchasedItems: null,
  checkoutData: {
    type: '',
    data: [],
    amount: 0,
  },
};

const MarketSlice = createSlice({
  name: 'Market',
  initialState,
  reducers: {
    setUserPurchasedItems: (state, action) => {
      state.userPurchasedItems = action.payload;
    },
    setCheckoutData: (state, action) => {
      state.checkoutData = action.payload;
    },
  },
});

export const { setUserPurchasedItems, setCheckoutData } = MarketSlice.actions;

export default MarketSlice.reducer;
