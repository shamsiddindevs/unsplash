import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import { useEffect, useState } from "react";
export const useCollection = (collectionName,whereData) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if(whereData[2]){
      
      const q = query(collection(db, collectionName), where(...whereData));
   onSnapshot(q,(snapshot) => {
      let res = [];
      snapshot?.forEach((doc) => {
        res.push({ _id: doc.id, ...doc.data() });
      });
      setData(res);
    }); 
  } 
  }, [whereData[2]]);
  // console.log(data)
  return {data};
};
