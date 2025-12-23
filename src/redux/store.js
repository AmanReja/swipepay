import { configureStore } from "@reduxjs/toolkit";
import { addcompanyReducer,customerReducer,merchantReducer,productReducer } from "./reducer";

const store = configureStore({
  reducer: {

    addcompany:addcompanyReducer,
    customers:customerReducer,
    merchant:merchantReducer,
    products:productReducer
    
   
  },
});
export default store;





