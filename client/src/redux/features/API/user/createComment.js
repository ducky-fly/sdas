import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comments: [],
  status: "idle",
  error: null,
  postStatus: "idle",
  postError: null,
};

// ✅ Gửi bình luận
export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ productId, content }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("COOKiNG_ACCESSTOKEN");
      const res = await axios.post(
        "http://localhost:8000/api/users/createComment",
        { productId, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data || "Lỗi không xác định");
    }
  }
);

// ✅ Lấy bình luận theo product
export const getCommentsByProduct = createAsyncThunk(
  "comment/getCommentsByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("COOKiNG_ACCESSTOKEN");
      const res = await axios.get(
        `http://localhost:8000/api/users/getCommentsBySong/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data || "Lỗi không xác định");
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    resetPostStatus: (state) => {
      state.postStatus = "idle";
      state.postError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟢 CREATE
      .addCase(createComment.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.postStatus = "succeeded";
        state.comments.unshift(action.payload); // thêm lên đầu
      })
      .addCase(createComment.rejected, (state, action) => {
        state.postStatus = "failed";
        state.postError = action.payload;
      })

      // 🟢 GET
      .addCase(getCommentsByProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCommentsByProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(getCommentsByProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetPostStatus, manualAppend } = commentSlice.actions;
export default commentSlice.reducer;
