import {createSlice} from '@reduxjs/toolkit'


let user = createSlice({
  name: "username", //name: 'state이름~'
  initialState: {
    username: '',
    isLoggedIn: false,
  }, //initialState: '값'
  /**
   * 1.state수정해주는 함수 만들기
   * 2.export해줘야함
   */
  reducers: {
    /**
     * @param state 기존스테이트
     * @param action 상태변화객체
     */
    /* setUsername: (state, action) => {
      state.username = action.payload;
    }, */
    login: (state, action)=>{
      state.username = action.payload;
      state.isLoggedIn = true;
    },
    
    logout: (state)=>{
      state.isLoggedIn = false;
      state.username = '';
    },

  },
});
export let { login, logout } = user.actions;

export default user;