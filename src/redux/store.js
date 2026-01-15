import { configureStore } from "@reduxjs/toolkit";
import { addcompanyReducer,customerReducer,merchantReducer,productReducer ,categoryReducer,invoiceReducer,expenseReducer,paymentReducer,expcaReducer,bankReducer,warehouseReducer,inventorytimelineReducer,signatureReducer,ifscReducer} from "./reducer";

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
    expcategory:expcaReducer,
    bank:bankReducer,
    warehouse:warehouseReducer,
    timeline:inventorytimelineReducer,
    signature:signatureReducer,
    ifsc:ifscReducer

    
   
  },
});
export default store;





