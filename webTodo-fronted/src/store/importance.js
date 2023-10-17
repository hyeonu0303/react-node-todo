import { createSlice } from "@reduxjs/toolkit";
let importance = createSlice({
  name: "importance", //name: 'state이름~'
  initialState: {
    visible:false,
    importanceContent:[]
  },
  reducers: {
    changeVisible(state,action){
      if(state.visible == true)
        state.visible = !action.payload
      else
        state.visible = action.payload
    },    
    addImportanceContent(state,action){
      state.importanceContent.push[action.payload]
    }
  },
  
});
export let { changeVisible, addImportanceContent } = importance.actions;

export default importance; 