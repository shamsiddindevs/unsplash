import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";
import { useGlobalContext } from "./useGlobalContext";

export const useRegister = () => {
  const { dispatch } = useGlobalContext();

  const registerWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Welcome");
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const registerWithEmail = async (displayName, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: displayName,
        photoURL: `https://api.dicebear.com/9.x/initials/svg?seed=${displayName}`,
      });

      console.log(user);
      toast.success("Welcome");
      dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
      toast.error(error.message);
      // ..
    }

    console.log("registerwithEmail");
  };

  const signInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Welcome");
        dispatch({ type: "LOGIN", payload: user });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return { registerWithGoogle, registerWithEmail, signInWithEmail };
};
