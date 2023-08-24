import {createSlice} from '@reduxjs/toolkit'


let todo = createSlice({
  name: "todo", //name: 'state이름~'
  initialState: {
    content: '',
    date: ''
  },
  reducers: {
    changeContent(state,action){
      state.content = action.payload
    },
    changeDate(state,action){
      state.date = action.payload;
    }
  },
});
export let { changeContent, changeDate } = todo.actions;

export default todo;