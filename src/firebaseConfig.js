// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvga7oAggOQfxqLWCoESlOufvTB38whnc",
  authDomain: "yumz-1aac9.firebaseapp.com",
  projectId: "yumz-1aac9",
  storageBucket: "yumz-1aac9.appspot.com",
  messagingSenderId: "692252144807",
  appId: "1:692252144807:web:950165254c1a861eb79782",
  measurementId: "G-ZTN62QRG3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);