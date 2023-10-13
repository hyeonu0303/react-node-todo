/* import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const updateContentFetch = createAsyncThunk(
  'editContent/updateContentFetch',
    async (content) => {
      const response = await axios.post('/api/update/content',{content});
      return response.data; 
    }
)

let editContent = createSlice({
  name: "editContent", //name: 'state이름~'
  initialState: {
    updateContent:'',
    loading:false,
    error:null
  },
  reducers: {
    updateContent(state,action){
      state.updateContent = action.payload
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(updateContentFetch.pending, (state)=>{
        state.loading = true;
      })
      .addCase(updateContentFetch.fulfilled,(state)=>{
        state.loading = false;
      })
      .addCase(updateContentFetch.rejected, (state,action)=>{
        state.loading = false;
        state.error =action.error.message;
      })
  }
});
export let { updateContent } = editContent.actions;

export default editContent; */