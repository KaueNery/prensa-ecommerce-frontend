import firebase from "firebase/app";
import "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNA838IDBJDJOz5cLfPs5Am071L9Am7pI",
  authDomain: "prensacompany-4cdfd.firebaseapp.com",
  projectId: "prensacompany-4cdfd",
  storageBucket: "prensacompany-4cdfd.appspot.com",
  messagingSenderId: "895041192265",
  appId: "1:895041192265:web:1012c53bd022b872fe5a98",
  measurementId: "G-BDB6DGT09C"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();