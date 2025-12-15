import { configureStore } from "@reduxjs/toolkit";
import { addcompanyReducer,customerReducer } from "./reducer";

const store = configureStore({
  reducer: {

    addcompany:addcompanyReducer,
    customers:customerReducer
    
   
  },
});
export default store;





