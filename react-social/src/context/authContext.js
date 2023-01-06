import { useReducer } from "react";
import { createContext } from "react"
import AuthReducer from "./authReducer";
const INITIAL_STATE = {
    user:null,
    isFetching:false,
    error:false,
}

export const Authcontext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    return(
        <Authcontext.Provider value={{user:state.user,isFetching:state.isFetching,error:state.error,
        dispatch}}>
            {children}
        </Authcontext.Provider>
    )


}