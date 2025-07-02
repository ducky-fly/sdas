import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDark: false,
};

export const counterSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.isDark = !state.isDark;
      console.log(state.isDark);
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTheme } = counterSlice.actions;

export default counterSlice.reducer;
