import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
};

const registerSlice = createSlice({
  name: "registerPage",
  initialState,
  reducers: {
    openPage: (state, action) => {
      state.isOpen = true;
    },
    closePage: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openPage, closePage } = registerSlice.actions;
export default registerSlice.reducer;
