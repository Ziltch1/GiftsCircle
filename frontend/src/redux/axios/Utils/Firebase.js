import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1YE-pMqazTnZso3uOy1Dot-Nfl9L3YBs",
  authDomain: "gifts-circle.firebaseapp.com",
  projectId: "gifts-circle",
  storageBucket: "gifts-circle.appspot.com",
  messagingSenderId: "989917835608",
  appId: "1:989917835608:web:af3a6525cb870c74a0b52d",
  measurementId: "G-T71F18GN9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { signInWithPopup, auth, app, provider };
