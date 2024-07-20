import { configureStore } from "@reduxjs/toolkit";
import promptReducer from "./componets/promptSlice";

export const store = configureStore({
  reducer: {
    prompt: promptReducer,
  },
});
