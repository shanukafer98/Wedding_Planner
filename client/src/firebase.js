// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "wedding-planner-9952c.firebaseapp.com",
  projectId: "wedding-planner-9952c",
  storageBucket: "wedding-planner-9952c.appspot.com",
  messagingSenderId: "308513330887",
  appId: "1:308513330887:web:d20bd21bd4b74a231ad0e2",
  measurementId: "G-GTPD3RT4ZZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
