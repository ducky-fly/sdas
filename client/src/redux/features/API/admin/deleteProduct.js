import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  response: "",
  status: "idle", // idle | loading | succeeded | failed
  error: "",
};

// Async thunk xoá sản phẩm
export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("COOKiNG_ACCESSTOKEN");

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/admin/deleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || "Xoá sản phẩm thất bại"
      );
    }
  }
);

export const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    resetDeleteStatus: (state) => {
      state.status = "idle";
      state.response = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.response = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetDeleteStatus } = deleteProductSlice.actions;
export default deleteProductSlice.reducer;
