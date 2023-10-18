import { createSlice } from "@reduxjs/toolkit";


// 비동기 요청 함수
/* export const postImportanceContent = createAsyncThunk(
  'importance/postImportanceContent',
  async (importanceData) => {
    console.log('요청중');
    
    const response = await fetch('/api/importance/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(importanceData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  }
); */


let importance = createSlice({
  name: "importance",
  initialState: {
    importanceContent:[]
  },
  reducers: {
    removeImportanceContent(state,action){
      const idToRemove = action.payload;
      state.importanceContent = state.importanceContent.filter(content => content._id !== idToRemove)
    },
    addImportanceContent(state,action){
        state.importanceContent.push(action.payload)
    },
  },

  /* extraReducers: (builder) => {
    builder
      .addCase(postImportanceContent.pending,state=>state.status = 'loading')
      .addCase(postImportanceContent.fulfilled, (state, action) => {
        state.status = 'success';
        state.importanceContent.push(action.payload);
      })
      .addCase(postImportanceContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  
  } */
  
});

export let {removeImportanceContent,addImportanceContent} = importance.actions;

export default importance; 