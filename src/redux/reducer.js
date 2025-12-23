import { ADD_COMPANY ,GET_COMPANY,ADD_CUSTOMER,GET_CUSTOMER,ADD_MERCHANT,GET_MERCHANT,GET_PRODUCTS} from "./action";


const initialaddcomState ={
    addcompany:[],
}

export const addcompanyReducer =(state=initialaddcomState,action)=>{

    if (action.type===ADD_COMPANY) {

    return{
        ...state,
        addcompany:[action.payload,...state.addcompany]
    }
        
    } else if(action.type===GET_COMPANY){
     return{
        ...state,
        addcompany:action.payload
     }
       
    } else{
        return state
    }

}

const initialaddcustomerState ={
    customers:[],
}

export const customerReducer =(state=initialaddcustomerState,action)=>{

    if (action.type===ADD_CUSTOMER) {

    return{
        ...state,
        customers:[action.payload,...state.customers]
    }
        
    } else if(action.type===GET_CUSTOMER){
     return{
        ...state,
        customers:action.payload
     }
       
    } else{
        return state
    }

}


const initialaddmerchantState ={
    merchant:[],
}

export const merchantReducer =(state=initialaddmerchantState,action)=>{

    if (action.type===ADD_MERCHANT) {

    return{
        ...state,
        merchant:[action.payload,...state.merchant]
    }
        
    } else if(action.type===GET_MERCHANT){
     return{
        ...state,
        merchant:action.payload.data
     }
       
    } 
    else{
        return state
    }

}
const initialproductState ={
    products:[],
}

export const productReducer =(state=initialproductState,action)=>{

   if(action.type===GET_PRODUCTS){
     return{
        ...state,
        products:action.payload.data
     }
       
    } 
    else{
        return state
    }

}