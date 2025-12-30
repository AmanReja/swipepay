import { configureStore } from "@reduxjs/toolkit";
import { addcompanyReducer,customerReducer,merchantReducer,productReducer ,categoryReducer,invoiceReducer,expenseReducer,paymentReducer,expcaReducer} from "./reducer";

const store = configureStore({
  reducer: {

    addcompany:addcompanyReducer,
    customers:customerReducer,
    merchant:merchantReducer,
    products:productReducer,
    category:categoryReducer,
    invoice:invoiceReducer,
    expense:expenseReducer,
    payments:paymentReducer,
    expcategory:expcaReducer
    
   
  },
});
export default store;





