import {createSlice} from '@reduxjs/toolkit'

let date = createSlice({
  name: "date", //name: 'state이름~'

  initialState: {
    selectMonth:'',
    selectDay:null,
    selectCalendarDate:'',
    checkValid:false,
    checkedType: '',
    allUniqueDates: [],
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
    },
    setAllUniqueDates(state,action){
      state.allUniqueDates = action.payload
    },
    changeCalendarDate(state,action){
      state.selectCalendarDate = action.payload;
    }
    
  }
});
export let {selectMonth, changeDayNum, changeCheckVaild, setAllUniqueDates, changeCalendarDate} = date.actions;

export default date;