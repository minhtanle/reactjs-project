// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOoevCz_Ixy9n-RaeWxaIR-mPDlA_73pk",
  authDomain: "reactjs-project-tanlm.firebaseapp.com",
  projectId: "reactjs-project-tanlm",
  storageBucket: "reactjs-project-tanlm.appspot.com",
  messagingSenderId: "1071659128057",
  appId: "1:1071659128057:web:d98f5948fd142b18117e28",
  measurementId: "G-WBJJF35QY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;