import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from './userSlice';
import todoSlice from './todoSlice';

const persistConfig = {
  key: "user", 
  storage: storage, //localstorage에 저장 
  whitelist:['username','isLoggedIn'] //유지하려는 키 값 name:에 저장한 변수명
  //blacklist: //유지하지 않을 상태 키 목록
};

/**
 * persistReducer 로컬스토리지에 저장을 해줌
 */
const userReducer = persistReducer(persistConfig,userSlice.reducer);

export default configureStore({
  reducer: {
    user: userReducer, //작명 : user.reducer
    todo : todoSlice.reducer
  },
});
