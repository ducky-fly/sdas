import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle", // idle | loading | successed | failed
  error: null,
};

// GET dữ liệu admin (ví dụ: danh sách sản phẩm)
export const dataAdmin = createAsyncThunk(
  "admin/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("COOKiNG_ACCESSTOKEN");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        "http://localhost:8000/api/admin/getValue",
        config
      );
      return response.data;
    } catch (error) {
      // Trả về error để Redux xử lý
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const valueAdminSlice = createSlice({
  name: "adminData",
  initialState,
  reducers: {
    // Bạn có thể thêm reducers nội bộ ở đây nếu cần
    resetAdminStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(dataAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(dataAdmin.fulfilled, (state, action) => {
        state.status = "successed";
        state.data = action.payload; // cập nhật data
        state.error = null;
      })
      .addCase(dataAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Đã có lỗi xảy ra";
      });
  },
});

export const { resetAdminStatus } = valueAdminSlice.actions;
export default valueAdminSlice.reducer;
