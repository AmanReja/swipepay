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
  FORGOT_PASSWORD,
  GETCOLLECTIONS,
  GETVERTUAL_ACCOUNT,VERIFY_AADHAR,LOGIN,GLOGIN,SENDOTP
} from "./action";



const initialloginState ={
  login:[],
}


export const loginReducer = (state=initialloginState,action)=>{
  if (action.type===LOGIN) {
    return{
      ...state,
      login:[action.payload , ...state.login]
    }
    
  }else{
    return state
  }
  
}
const initialsendotp ={
  otp:[],
}


export const otpReducer = (state=initialsendotp,action)=>{
  if (action.type===SENDOTP) {
    return{
      ...state,
      otp:[action.payload , ...state.otp]
    }
    
  }else{
    return state
  }
  
}

const initialgoogleloginState ={
  glogin:[],
}


export const gloginReducer = (state=initialgoogleloginState,action)=>{
  if (action.type===GLOGIN) {
    return{
      ...state,
      glogin:[action.payload , ...state.glogin]
    }
    
  }else{
    return state
  }
  
}








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
  else if (action.type === DELETEENTITY_CALLBACK) {
   
    return{
      ...state,
      entitycallback:state.entitycallback.map((entity) => entity.id === action.payload.id?{...entity,...action.payload}:entity)
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

const initialcollections = {
  collections: [],
};

export const collectionsReducer = (state = initialcollections, action) => {
   if(action.type===GETCOLLECTIONS){
    
    return{
      ...state,
      collections:action.payload
    }

  }
  
  
  
  else {
    return state;
  }
};

const initialvastate = {
  vaaccount:[],
}

export const vaReducer = (state = initialvastate, action) => {
   if(action.type===GETVERTUAL_ACCOUNT){
    
    return{
      ...state,
      vaaccount:action.payload
    }

  }
  
  
  
  else {
    return state;
  }
};


const initialaadharverifystate = {
  aadhar:[],
}

 export const aadharReducer =(state=initialaadharverifystate,action)=>{

  if (action.type===VERIFY_AADHAR) {
    return {...state,

      aadhar:[action.payload, ...state.aadhar]
    }
    
  }  
  else {
    return state;
  }


}