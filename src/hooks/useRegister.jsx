import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";
import { useGlobalContext } from "./useGlobalContext";

export const useRegister = () => {
  const {dispatch}=useGlobalContext()
  
  const registerWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
       toast.success("Welcome")
        const user = result.user;
        dispatch({type:"LOGIN",payload:user})
        
      })
      .catch((error) => {
     
        toast.error(error.message)
        
      });
  };

  return { registerWithGoogle };
};
