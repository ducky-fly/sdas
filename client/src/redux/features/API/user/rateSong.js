import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const rateSong = createAsyncThunk(
  "song/rate",
  async ({ songId, star }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("COOKiNG_ACCESSTOKEN");
      const res = await axios.patch(
        `http://localhost:8000/api/users/like/${songId}`,
        { star },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const rateSongSlice = createSlice({
  name: "rateSong",
  initialState: {
    status: "idle",
    error: null,
    result: null,
  },
  reducers: {
    resetRateStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(rateSong.pending, (state) => {
        state.status = "loading";
      })
      .addCase(rateSong.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(rateSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetRateStatus } = rateSongSlice.actions;
export default rateSongSlice.reducer;
