import { Form, useActionData } from "react-router-dom";
import FormInput from "./FormInput";
import {  sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useEffect } from "react";


const Modal = () => {
  
  const data = useActionData()
  console.log(data)

 useEffect(()=>{
    if(data?.emailForReset){
        sendPasswordResetEmail(auth,data.emailForReset)
        .then(() => {      
          toast.success("Reset password");
        })
        .catch((error) => {
         toast.error(error.message)
        }).finally(()=>{document.getElementById('my_modal_1').close()})
    }
    
 },[data])

  return (
    <dialog  id="my_modal_1" className="modal" >
      <div className="modal-box">
        <Form method="post">
          <h3 className="text-xl font-bold">Reset Password:</h3>
          <FormInput type={"email"} placeholder={"Email"} name={"emailForReset"} />
          <div className="modal-action">
            <button
            type="button"
            onClick={()=>document.getElementById('my_modal_1').close()}
              className="btn btn-primary btn-sm md:btn-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-secondary btn-sm md:btn-md"
            >
              Send
            </button>
          </div>
        </Form>
      </div>
    </dialog>
  );
};
export default Modal;
