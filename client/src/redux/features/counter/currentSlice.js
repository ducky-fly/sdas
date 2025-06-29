import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    value: 0,
    data:[],
    status:"idle",
    error:""
}

export const current = createAsyncThunk('counter/fetchData', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const currentSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
    
    },
    extraReducers:(builder)=>{
      builder
        .addCase(current.pending,(state)=>{
          state.status = "loading";
        })
        .addCase(current.fulfilled,(state,action)=>{
          state.status = "successed";
          state.data = action.payload;
        })
        .addCase(current.rejected,(state,action)=>{
          state.status = "failed";
          state.error = action.error;
        })
    },
})

export default currentSlice.reducer