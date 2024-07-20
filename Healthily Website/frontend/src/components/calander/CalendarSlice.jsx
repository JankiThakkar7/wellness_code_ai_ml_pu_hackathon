import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDate: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setDate } = calendarSlice.actions;
export default calendarSlice.reducer;