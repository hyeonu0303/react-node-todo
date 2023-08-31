import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from './userSlice';
import todoSlice from './todoSlice';

const persistConfig = {
  key: "user", 
  storage: storage,
  whitelist: ['username', 'isLoggedIn']
};

const userReducer = persistReducer(persistConfig, userSlice.reducer);

const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoSlice.reducer,
  },
});

export default store;
