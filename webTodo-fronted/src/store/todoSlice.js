import {createSlice} from '@reduxjs/toolkit'
import moment from 'moment';

let todayDate = new Date(); 
let formatTodayDate = moment(todayDate).format('YYYY-MM-DD');

let todo = createSlice({
  name: "todo", //name: 'state이름~'

  initialState: {
    content: '',
    date: [formatTodayDate],
    tags: [],
    selectTag: '', // 선택한 태그
    selectTime: '', // 설정한 시간
    important:null,
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