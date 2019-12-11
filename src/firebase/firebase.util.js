import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDtpNLhY8ooJydD5ZuqsKwKQUSU5W6jlL8",
  authDomain: "ec-sample-b8820.firebaseapp.com",
  databaseURL: "https://ec-sample-b8820.firebaseio.com",
  projectId: "ec-sample-b8820",
  storageBucket: "ec-sample-b8820.appspot.com",
  messagingSenderId: "890474208192",
  appId: "1:890474208192:web:f395628fff3cc4d9828625",
  measurementId: "G-HK7V7XC58Z"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
