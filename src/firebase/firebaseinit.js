
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3sA_9n4MlD3wfCvHkDKXxzwG6o42nF8c",
  authDomain: "book-curier.firebaseapp.com",
  projectId: "book-curier",
  storageBucket: "book-curier.firebasestorage.app",
  messagingSenderId: "170146495908",
  appId: "1:170146495908:web:b1c16f46f99b260a1d9531"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
