import { configureStore } from "@reduxjs/toolkit";
import currentSlice from "./features/API/current";
import counterSlice from "./features/counter/isDark";
import valueAdminSlice from "./features/API/admin/getAllProduct";
import uploadProduct from "./features/API/admin/uploaadProduct";
import updateProduct from "./features/API/admin/updateProduct";
import deleteProductSlice from "./features/API/admin/deleteProduct";
import rateSong from "./features/API/user/rateSong";
import commentSlice from "./features/API/user/createComment";
export const store = configureStore({
  reducer: {
    current: currentSlice,
    isDark: counterSlice,
    admin: valueAdminSlice,
    postAudio: uploadProduct,
    putProduct: updateProduct,
    deleteProduct: deleteProductSlice,
    rateSong: rateSong,
    comment: commentSlice,
  },
});
