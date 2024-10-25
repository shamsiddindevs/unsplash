// import firebase
import { collection,doc, addDoc,deleteDoc  } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import { toast } from "react-toastify"


export const useFirestore =()=>{
   const addDocument = (collectionName,data)=>{
      addDoc(collection(db, collectionName), data).then(()=>{toast.success("You liked this image ❤️")})
      .catch((e)=>{console.log(e.message)})
   }  

   const deleteDocument = (collectionName,id)=>{
    deleteDoc(doc(db, collectionName, id)).then(()=>{toast.warning("You deleted this image 🗑️")})
      .catch((e)=>{console.log(e.message)})
   }

   return {addDocument, deleteDocument}
}
