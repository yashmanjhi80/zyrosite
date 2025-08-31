// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCh20t0xSIAeGnxLdFYQZklIgQITdOg1D0",
  authDomain: "dark-dream-network.firebaseapp.com",
  databaseURL: "https://dark-dream-network-default-rtdb.firebaseio.com",
  projectId: "dark-dream-network",
  storageBucket: "dark-dream-network.appspot.com",
  messagingSenderId: "940030703815",
  appId: "1:940030703815:web:0a1d31a1bde5eed87d26e2",
  measurementId: "G-J50NRG0GVX"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
