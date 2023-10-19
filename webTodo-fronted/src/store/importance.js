import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 비동기 요청 함수
export const fetchImportanceContent = createAsyncThunk(
  'importance/fetchImportanceContent',
  async () => {
    const response = await axios.get('/api/importance/content');
    return response.data;
  }
);



let importance = createSlice({
  name: "importance",
  initialState: {
    importanceContent:[],
    status: 'idle',
    error: null
  },
  reducers: {
    removeImportanceContent(state,action){
      const idToRemove = action.payload;
      state.importanceContent = state.importanceContent.filter(content => content.contentId !== idToRemove)
    },
    addImportanceContent(state,action){
      state.importanceContent.push(action.payload)
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchImportanceContent.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchImportanceContent.fulfilled, (state, action) => {
        state.status = 'success';
        state.importanceContent = action.payload; // 서버에서 가져온 데이터로 초기값 설정
      })
      .addCase(fetchImportanceContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
  
});

export let {removeImportanceContent,addImportanceContent} = importance.actions;

export default importance; 