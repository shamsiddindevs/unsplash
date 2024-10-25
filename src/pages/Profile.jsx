import React, { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Link } from "react-router-dom";

import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useStorage } from "../hooks/useStorage";

const Profile = () => {
  const [follow, setFollow] = useState(true);

  const {
    likedImages: { user,loading },
  } = useGlobalContext();
  const [base64, setBase64] = useState(""); // Bu yerda Base64 kodini saqlaymiz

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Faylni olish
    if (file.size % 1024 < 1024) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const base64String = loadEvent.target.result;
        setBase64(base64String); // Natijani state ga saqlash
      };
      reader.readAsDataURL(file); // Faylni Base64 formatiga o'qish
    }else{
      toast.warning("IMG must be less than 1MB")
    }
  };

  const {updateImage}=useStorage()

  const updateNewImage=()=>{
    updateImage(base64)
    setTimeout(()=>{
      setBase64("")
    },3000)
  }

  const canselSaveImg =()=>{
    setBase64("")
  }



  return (
    <div>
      <div className="container mx-auto flex flex-col gap-5 px-4 md:flex-row">
        <div className="card max-w-96 bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col gap-3">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  {base64 ? (
                    <figure className="relative w-24 h-24">
                     {loading && <span className="absolute loading loading-spinner loading-md"></span>}
                      <img src={base64} className="w-24 h-24 object-cover" alt="Uploaded" />
                    </figure>
                  ) : (
                    <img
                      src={user && user?.photoURL}
                      alt={user && user?.displayName + "avatar"}
                    />
                  )}
                </div>
              </div>
              {(!base64?<input
                type="file"
                className="file-input-sm file-input file-input-bordered file-input-primary w-4/5"
                accept="image/*"
                onChange={handleFileChange}
              />:<div className=" flex gap-3">
                <button onClick={canselSaveImg} className="btn btn-sm btn-secondary">Cansel</button>
                <button onClick={updateNewImage} className="btn btn-sm btn-primary">Save</button>
                </div>)}
            </div>
            <h2 className="card-title capitalize">
              {user && user?.displayName}
            </h2>
            <p>Software Engineer at OpenAI</p>
            <p>
              John enjoys working on challenging problems and is passionate
              about AI technology.
            </p>
            <div className="card-actions justify-end">
              {follow ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setFollow(!follow)}
                >
                  {"Follow"}
                </button>
              ) : (
                <button
                  className="btn btn-sm"
                  onClick={() => setFollow(!follow)}
                >
                  {"Following"}
                </button>
              )}
              <Link to="/contact" className="btn btn-ghost btn-sm">
                Message
              </Link>
            </div>
          </div>
        </div>
        <div className="card flex-1 bg-base-200 shadow-xl">
          <div className="card-body grid lg:grid-cols-2">
            <div className="">
              <h3 className="mb-2 text-xl font-medium">Display Name:</h3>
              <p>{user?.displayName}</p>
            </div>
            <div className="">
              <h3 className="mb-2 text-xl font-medium">Email:</h3>
              <p className="text-base">{user?.email}</p>
            </div>
            <div className="">
              <h3 className="mb-2 text-xl font-medium">Status User:</h3>
              <p>{user?.emailVerified ? "Verifed ✅" : "Not Verifed ❌"}</p>
            </div>
            <div className="">
              <h3 className="mb-2 text-xl font-medium">Now Verify:</h3>
              {!user?.emailVerified ? (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    sendEmailVerification(auth.currentUser, {
                      url: "http://localhost:5173/profile",
                    }).then(() => {
                      toast.success("Send successfully");
                    })
                  }
                >
                  {"Send"}
                </button>
              ) : (
                <button className="btn btn-ghost btn-sm">Completed</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
