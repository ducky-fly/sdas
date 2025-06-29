import { configureStore } from "@reduxjs/toolkit";
import currentSlice from "./features/counter/currentSlice";

export const store = configureStore({
  reducer: {
    current: currentSlice,
  },
});