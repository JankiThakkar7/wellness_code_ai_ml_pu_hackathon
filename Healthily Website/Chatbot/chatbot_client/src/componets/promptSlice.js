import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promptHistory: [],
};

const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    addPrompt: (state, action) => {
      state.promptHistory.push(action.payload);
    },
  },
});

export const { addPrompt } = promptSlice.actions;
export default promptSlice.reducer;
