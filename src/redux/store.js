import { configureStore } from "@reduxjs/toolkit";
import { addcompanyReducer,customerReducer,merchantReducer } from "./reducer";

const store = configureStore({
  reducer: {

    addcompany:addcompanyReducer,
    customers:customerReducer,
    merchant:merchantReducer
    
   
  },
});
export default store;





