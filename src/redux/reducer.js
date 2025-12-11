import { ADD_COMPANY ,GET_COMPANY} from "./action";


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