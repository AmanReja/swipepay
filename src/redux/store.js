import { configureStore } from "@reduxjs/toolkit";
import { addcompanyReducer } from "./reducer";

const store = configureStore({
  reducer: {

    addcompany:addcompanyReducer,
    
   
  },
});
export default store;





