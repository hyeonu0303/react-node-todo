import {createSlice} from '@reduxjs/toolkit'

let date = createSlice({
  name: "date", //name: 'state이름~'

  initialState: {
    selectMonth:''
  },

  reducers: {
    selectMonth(state,action){
      state.selectMonth = action.payload
    }
  }

});
export let {selectMonth} = date.actions;

export default date;