import { ADD_COMPANY ,GET_COMPANY,ADD_CUSTOMER,GET_CUSTOMER} from "./action";


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