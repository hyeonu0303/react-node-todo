import {createSlice} from '@reduxjs/toolkit'


let todo = createSlice({
  name: "todo", //name: 'state이름~'
  initialState: {
    content: '',
    date: '',
    tags: [],
    tag: '', // 선택한 태그
  },
  reducers: {
    changeContent(state,action){
      state.content = action.payload
    },
    changeDate(state,action){
      state.date = action.payload;
    },
    addTag(state, action) {
      state.tags.push(action.payload);
    },
    changeTag(state,action){
      state.tag = action.payload;
    }
  },
});
export let { changeContent, changeDate, addTag, changeTag } = todo.actions;

export default todo;