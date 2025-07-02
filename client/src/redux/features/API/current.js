import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: 0,
  data: [],
  status: "idle",
  error: "",
};
const refreshAccessToken = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/users/refresh",
      { withCredentials: true }
    );
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("COOKiNG_ACCESSTOKEN", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("FAILED TO REFRESH TOKEN1");
    localStorage.removeItem("COOKiNG_ACCESSTOKEN");
    return null;
  }
};

export const current = createAsyncThunk("API/current", async () => {
  try {
    const accessToken = localStorage.getItem("COOKiNG_ACCESSTOKEN");
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const responseData = await axios.get(
      "http://localhost:8000/api/users/current",
      config
    );
    return responseData.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        let config = {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        };
        try {
          const responseData = await axios.get(
            "http://localhost:8000/api/users/current",
            config
          );
          return responseData.data;
        } catch (err) {
          console.error("FAILED TO REFRESH TOKEN");
        }
      } else {
        localStorage.removeItem("COOKiNG_EMAIL");
        localStorage.removeItem("COOKiNG_USERNAME");
      }
    }
    throw new error("Vui long dang nhap lai");
  }
});

export const currentSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(current.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(current.fulfilled, (state, action) => {
        state.status = "successed";
        state.data = action.payload;
      })
      .addCase(current.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { } = currentSlice.actions

export default currentSlice.reducer;
