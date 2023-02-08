import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: {
    message: null,
    type: "",
    title:""
  },
  isLoading: false,
  searchQuery: "",
};

const UtilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    createResponse: (state, action) => {
      state.response = {
        message: action.payload.message,
        type: action.payload.type,
      };
    },
  },
});

export const { setLoading, createResponse } = UtilSlice.actions;

export default UtilSlice.reducer;
