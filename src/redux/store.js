import { configureStore } from "@reduxjs/toolkit";
import { addcompanyReducer,customerReducer,merchantReducer,productReducer ,categoryReducer,invoiceReducer} from "./reducer";

const store = configureStore({
  reducer: {

    addcompany:addcompanyReducer,
    customers:customerReducer,
    merchant:merchantReducer,
    products:productReducer,
    category:categoryReducer,
    invoice:invoiceReducer
    
   
  },
});
export default store;





