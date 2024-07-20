import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPatientPresent: false,
};

const patientPresentSlice = createSlice({
  name: "patientPresent",
  initialState,
  reducers: {
    setPatientPresence: (state, action) => {
      state.isPatientPresent = action.payload;
    },
  },
});

export const { setPatientPresence } = patientPresentSlice.actions;
export default patientPresentSlice.reducer;
