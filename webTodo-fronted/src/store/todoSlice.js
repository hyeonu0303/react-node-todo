import {createSlice} from '@reduxjs/toolkit'


let todo = createSlice({
  name: "todo", //name: 'state이름~'

  initialState: {
    content: '',
    date: '',
    tags: [],
    selectTag: '', // 선택한 태그
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
    changeSelectTag(state,action){
      state.selectTag = action.payload;
    }
  }

});
export let { changeContent, changeDate, addTag, changeSelectTag } = todo.actions;

export default todo;