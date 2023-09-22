import {createSlice} from '@reduxjs/toolkit'

let date = createSlice({
  name: "date", //name: 'state이름~'

  initialState: {
    selectMonth:'',
    selectDay:null,
  },

  reducers: {
    selectMonth(state,action){
      state.selectMonth = action.payload
    },
    changeDayNum(state,action){
      state.selectDay = action.payload
    }
  }
});
export let {selectMonth, changeDayNum} = date.actions;

export default date;