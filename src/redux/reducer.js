import { ADD_COMPANY ,GET_COMPANY,ADD_CUSTOMER,GET_CUSTOMER,ADD_MERCHANT,GET_MERCHANT,GET_PRODUCTS,ADD_CATEGORY,GET_CATEGORY,ADD_PRODUCT,GET_INVOICE, GET_EXPENSE,GET_PAYMENTS,ADD_EXP_CATEGORY,GET_EXP_CATEGORY, ADD_EXPENSE,ADD_BANK,GET_BANK,GET_WAREHOUSE,GET_INVENTORY_TIMELINE, ADD_INVOICE} from "./action";


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
       
    } else if(action.type===ADD_PRODUCT){

        return {
            ...state,
            products:[action.payload,...state.products]
        }
    }
    else{
        return state
    }

}


const initialcategoryState ={
    category:[],
}

export const categoryReducer =(state=initialcategoryState,action)=>{

   if(action.type===GET_CATEGORY){
     return{
        ...state,
        category:action.payload
     }
       
    } else if(action.type===ADD_CATEGORY){
         return{
            ...state,
            category:[action.payload,...state.category]
         }
    }
    else{
        return state
    }

}

const initialinvoiceState ={
    invoice:[],
}

export const invoiceReducer =(state=initialinvoiceState,action)=>{

   if(action.type===GET_INVOICE){
     return{
        ...state,
        invoice:action.payload.invoices

     }
       
    } else if(action.type===ADD_INVOICE){
        return{
             ...state,
             invoice:[action.payload,...state.invoice]

        }
    }
    else{
        return state
    }

}
const initialexpenseState ={
    expense:[],
}

export const expenseReducer =(state=initialexpenseState,action)=>{

   if(action.type===GET_EXPENSE){
     return{
        ...state,
        expense:action.payload

     }
       
    } 
    else if(action.type===ADD_EXPENSE){
       return{
        ...state,
        expense:[action.payload,...state.expense]
       }

    }else{
        return state
    }

}
const initialpaymentState ={
    payments:[],
}

export const paymentReducer =(state=initialpaymentState,action)=>{

   if(action.type===GET_PAYMENTS){
     return{
        ...state,
        payments:action.payload

     }
       
    } 
    else{
        return state
    }

}
const initialexpcatState ={
    expcategory:[],
}

export const expcaReducer =(state=initialexpcatState,action)=>{

   if(action.type===GET_EXP_CATEGORY){
     return{
        ...state,
        expcategory:action.payload


     }
       
     }
    else{
        return state
    }

}


const initialwarehouseState ={
    warehouse:[],
}

export const warehouseReducer =(state=initialwarehouseState,action)=>{

   if(action.type===GET_WAREHOUSE){

        return{
        ...state,
        warehouse:action.payload    
        
        }

     }
    else{
        return state
    }

}

const initialbankState ={
    bank:[],
}

export const bankReducer =(state=initialbankState,action)=>{

   if(action.type===ADD_BANK){
     return{
        ...state,
        bank:[action.payload,...state.bank]


     }
       
     } else if(action.type===GET_BANK){

        return{
        ...state,
        bank:action.payload    
        
        }

     }
    else{
        return state
    }

}
const initialinventorytimelineState ={
    timeline:[],
}

export const inventorytimelineReducer =(state=initialinventorytimelineState,action)=>{

   if(action.type===GET_INVENTORY_TIMELINE){
     return{
        ...state,
        timeline:action.payload


     }
       
     } 
    else{
        return state
    }

}