// reducer.js

import {
  GETALL_LEDGER_WALLET,
  GETALL_PAYOUTLOG_DATA,
  GETALL_BULKPAY_DATA,
  GETALL_WALLET_COMPANY_DATA,
  PAYOUT_REPORT,
  GETONE_USER,
  GETENTITY_CALLBACK,
  ADDENTITY_CALLBACK,
  DELETEENTITY_CALLBACK,
  UPDATEENTITY_CALLBACK,
  FORGOT_PASSWORD
} from "./action";





const getoneuserState ={
 getoneuser:[],

}

export const getoneuserReducer =(state=getoneuserState,action)=>{


  if (action.type===GETONE_USER) {
    return{
      ...state,
      getoneuser:action.payload,
    }
    
  } else{
    return state;
  }

};




const initialLedgerWalletState = {
  ledgerwallet: [],
};

export const ledgerwalletReducer = (
  state = initialLedgerWalletState,
  action
) => {
  if (action.type === GETALL_LEDGER_WALLET) {
    return {
      ...state,
      ledgerwallet: action.payload,
    };
  } else {
    return state;
  }
};

const initialPayoutLogState = {
  payoutlog: [],
};

export const payoutlogReducer = (state = initialPayoutLogState, action) => {
  if (action.type === GETALL_PAYOUTLOG_DATA) {
    return {
      ...state,
      payoutlog: action.payload,
    };
  } else {
    return state;
  }
};

const initialbulkpaystate = {
  bulkpayout: [],
};

export const bulkpayoutReducer = (state = initialbulkpaystate, action) => {
  if (action.type === GETALL_BULKPAY_DATA) {
    return {
      ...state,
      bulkpayout: action.payload,
    };
  } else {
    return state;
  }
};
const initialwalletcompanystate = {
  walletcompany: [],
};

export const walletcompanyReducer = (state = initialwalletcompanystate, action) => {
  if (action.type === GETALL_WALLET_COMPANY_DATA) {
    return {
      ...state,
      walletcompany: action.payload,
    };
  } else {
    return state;
  }
};
const initialpayoutreport = {
  payoutreport: [],
};

export const payoutreportReducer = (state = initialpayoutreport, action) => {
  if (action.type === PAYOUT_REPORT) {
    return {
      ...state,
      payoutreport: action.payload,
    };
  } else {
    return state;
  }
};


const initialentitycallbackevent = {
  entitycallback: [],
};

export const entitycallbackReducer = (state = initialentitycallbackevent, action) => {
  if (action.type === GETENTITY_CALLBACK) {
    return {
      ...state,
      entitycallback: action.payload,
    };
  } else if(action.type===ADDENTITY_CALLBACK){
    
    return{
      ...state,
      entitycallback:[action.payload, ...state.entitycallback]
    }

  }
   else if(action.type===DELETEENTITY_CALLBACK){
    
    return{
      ...state,
      entitycallback:state.entitycallback.filter((entity) => entity.id !== action.payload.id)
    }

  }
   else if(action.type===UPDATEENTITY_CALLBACK){
    
    return{
      ...state,
      entitycallback:state.entitycallback.map((entity) => entity.id === action.payload.id?{...entity,...action.payload}:entity)
    }

  }
  
  
  
  else {
    return state;
  }
};

const initialforgotpass = {
  forgotpass: [],
};

export const forgotpassReducer = (state = initialforgotpass, action) => {
   if(action.type===FORGOT_PASSWORD){
    
    return{
      ...state,
      forgotpass:state.forgotpass.map((pass) => pass.id === action.payload.id?{...pass,...action.payload}:pass)
    }

  }
  
  
  
  else {
    return state;
  }
};

