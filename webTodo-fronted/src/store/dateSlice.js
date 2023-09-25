import {createSlice} from '@reduxjs/toolkit'

let date = createSlice({
  name: "date", //name: 'state이름~'

  initialState: {
    selectMonth:'',
    selectDay:null,
    checkValid:false,
    checkedType: '',
  },

  reducers: {
    selectMonth(state,action){
      state.selectMonth = action.payload
    },
    changeDayNum(state,action){
      state.selectDay = action.payload
    },
    changeCheckVaild(state,action){
      state.checkValid = action.payload.checked;
      state.checkedType = action.payload.type;
    }
  }
});
export let {selectMonth, changeDayNum, changeCheckVaild} = date.actions;

export default date;