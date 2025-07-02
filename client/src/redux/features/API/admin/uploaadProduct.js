import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { data } from "react-router";

const initialState = {
  data: [], // ảnh sản phẩm
  status: "idle", // trạng thái: idle | loading | succeeded | failed
  error: null,
};

// Thunk để upload sản phẩm (ảnh + formData)
export const uploadProduct = createAsyncThunk(
  "admin/uploadProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("COOKiNG_ACCESSTOKEN");
      console.log(accessToken);

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "http://localhost:8000/api/admin/uploadProduct",
        formData,
        config
      );

      return response.data; // sẽ có { message, product }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const uploadProductSlice = createSlice({
  name: "uploadProduct",
  initialState,
  reducers: {
    resetUploadStatus: (state) => {
      state.status = "idle";
      state.error = null;
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.product?.url_img || ""; // lưu ảnh nếu có
        state.error = null;
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Upload thất bại";
      });
  },
});

export const { resetUploadStatus } = uploadProductSlice.actions;
export default uploadProductSlice.reducer;
