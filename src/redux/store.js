import { configureStore } from "@reduxjs/toolkit";

import {
  payoutlogReducer,
  ledgerwalletReducer,
  bulkpayoutReducer,
  walletcompanyReducer,
  payoutreportReducer,
  getoneuserReducer,
  entitycallbackReducer,
  forgotpassReducer,
  collectionsReducer,
  vaReducer,aadharReducer
} from "./reducer";
const store = configureStore({
  reducer: {
    ledgerwallet: ledgerwalletReducer,
    payoutlog: payoutlogReducer,
    bulkpayout: bulkpayoutReducer,
    walletcompany:walletcompanyReducer,
    payoutreport:payoutreportReducer,
    getoneuser:getoneuserReducer,
    entitycallback:entitycallbackReducer,
    forgotpass:forgotpassReducer,
    collections:collectionsReducer,
    vaaccount:vaReducer,
    aadhar:aadharReducer

  },
});
export default store;
