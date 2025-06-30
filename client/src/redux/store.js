import { configureStore } from "@reduxjs/toolkit";
import currentSlice from "./features/API/current";

export const store = configureStore({
  reducer: {
    current: currentSlice,
  },
});
