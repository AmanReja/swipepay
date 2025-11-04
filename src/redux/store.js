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
  vaReducer,aadharReducer,loginReducer,gloginReducer,otpReducer,colreportReducer,summaryReducer,virtualaccountReducer,chartreportReducer,colchartreportReducer
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
    aadhar:aadharReducer,
    login:loginReducer,
    glogin:gloginReducer,
    otp:otpReducer,
    colreport:colreportReducer,
    summarydata:summaryReducer,
    virtualaccount:virtualaccountReducer,
    chartreport:chartreportReducer,
    colchartreport:colchartreportReducer

  },
});
export default store;
