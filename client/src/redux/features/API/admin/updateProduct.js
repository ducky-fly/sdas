import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router";

const initialState = {
  data: null,
  status: "idle",
  error: "",
};

// Gửi PUT API để cập nhật sản phẩm
export const putProduct = createAsyncThunk(
  "admin/putProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    const accessToken = localStorage.getItem("COOKiNG_ACCESSTOKEN");

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/admin/updateProduct/${id}`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.status = "idle";
      state.error = "";
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(putProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(putProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data =
          action.payload.product || action.payload.updatedProduct || null;
      })
      .addCase(putProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetUpdateStatus } = updateProductSlice.actions;
export default updateProductSlice.reducer;
