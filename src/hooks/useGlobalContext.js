import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export const useGlobalContext=()=>{
    const context = useContext(GlobalContext);
    if(!context){
        throw new Error("context is not in provider");
        
    }
    return  context
}