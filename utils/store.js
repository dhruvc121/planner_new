import { createContext, useReducer } from "react";

export const Store=createContext()
const initialState={
    plans:[],
    master:[]
};

const reducer=(state,action)=>{
    switch(action.type){
        case "UPDATE_PLANS":    return {...state,plans:action.payload}
        case "MASTER":  return {...state,master:action.payload}
        default:return state;
    }
}

export function StoreProvider(props){
    const [state,dispatch]=useReducer(reducer,initialState);
    const value={state,dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}