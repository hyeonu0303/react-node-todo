import {createSlice} from '@reduxjs/toolkit'


let todo = createSlice({
  name: "todo", //name: 'state이름~'

  initialState: {
    content: '',
    date: '',
    tags: [],
    selectTag: '', // 선택한 태그
    selectTime: '', // 설정한 시간
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
    },
    setTime(state, action){
      state.selectTime = action.payload;
    },
    clearTime(state) {
      state.selectTime = '';
    }
  }

});
export let { changeContent, changeDate, addTag ,changeSelectTag, setTime, clearTime } = todo.actions;

export default todo;