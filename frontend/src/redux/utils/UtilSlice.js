import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: {
    message: null,
    type: "",
    title:""
  },
  isLoading: false,
  searchQuery: "",
  welcomeModal: false
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
    setWelcomeModal: (state, action) => {
      state.welcomeModal = action.payload;
    },
  },
});

export const { setLoading, createResponse, setWelcomeModal } = UtilSlice.actions;

export default UtilSlice.reducer;
