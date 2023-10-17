import { createSlice } from "@reduxjs/toolkit";

let data = createSlice({
  name: "data", //name: 'state이름~'
  initialState: {
    data:[],
    markDate:[]
  },
  reducers: {
    insertData(state,action){
      state.data = action.payload
    },
    insertMarkDate(state,action){
      state.markDate = action.payload
    }
  },
  
});
export let { insertData,insertMarkDate } = data.actions;

export default data; 