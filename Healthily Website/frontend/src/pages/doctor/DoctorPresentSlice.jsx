import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDoctorPresent: false,
};

const doctorPresentSlice = createSlice({
  name: "doctorPresent",
  initialState,
  reducers: {
    setDoctorPresence: (state, action) => {
      state.isDoctorPresent = action.payload;
    },
  },
});

export const { setDoctorPresence } = doctorPresentSlice.actions;
export default doctorPresentSlice.reducer;
