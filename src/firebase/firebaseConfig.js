// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3b_fx4HeQVnz9pXi-AsByNrpcP8WPUM0",
  authDomain: "surat-8fa80.firebaseapp.com",
  projectId: "surat-8fa80",
  storageBucket: "surat-8fa80.appspot.com",
  messagingSenderId: "328016002615",
  appId: "1:328016002615:web:a9555c625e498441ba09b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth()