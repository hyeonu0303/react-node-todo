import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// 비동기 요청 함수
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    const response = await axios.get('/api/data');
    return response.data;
  }
);

let data = createSlice({
  name: "data", //name: 'state이름~'
  initialState: {
    data:[],
    markDate:[],
    status: 'idle',
    error: null
  },
  reducers: {
    insertData(state,action){
      state.data.push(action.payload);
    },
    insertMarkDate(state,action){
      state.markDate = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload; // 서버에서 가져온 데이터로 초기값 설정
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }

});
export let { insertData,insertMarkDate } = data.actions;

export default data; 