// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg9S7JIq8yhaSaXHF4A1MtM_-z8sMgGNs",
  authDomain: "netflixgpt-8edbc.firebaseapp.com",
  projectId: "netflixgpt-8edbc",
  storageBucket: "netflixgpt-8edbc.appspot.com",
  messagingSenderId: "354712609710",
  appId: "1:354712609710:web:b936d80a11d2360635de3f",
  measurementId: "G-TLFQQYT93P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();