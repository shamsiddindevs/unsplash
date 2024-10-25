import React, { useState } from "react";
import { updateProfile  } from "firebase/auth";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../firebase/firebaseConfig"; // Firebase sozlamalarini import qiling
import { useGlobalContext } from "./useGlobalContext";
import { toast } from "react-toastify";

export const useStorage = () => {
  const {
    likedImages: { user,loading },
    dispatch,
  } = useGlobalContext();

  const updateImage = async (base64string) => {
    dispatch({type:"LOADING",payload:true})
      try {
        const storageRef = ref(storage, `profilePicture/${user.uid}.jpg`);

      // Firebase Storage'ga rasmni yuklash
      await uploadString(storageRef, base64string, "data_url");
        
      // URL-ni olish
        const downloadURL = await getDownloadURL(storageRef);
    
        // Firestore'ga rasm URL'ini saqlash
       
    updateProfile(auth.currentUser,{
        photoURL:downloadURL
    })
    .then(()=>{
        toast.success("Image Update !")
        dispatch({type:"LOGIN",payload:{...user,photoURL:downloadURL}})
    })
    .catch((err)=>{
        toast.error(err.message)
    })
    


    } catch (error) {
      toast.error("Rasm yuklashda xatolik: ", error);
    } finally {
        dispatch({type:"LOADING",payload:false})
    }
  };

  return {updateImage}
};
