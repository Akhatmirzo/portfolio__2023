import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8bzDQLP7UAVdJwgwJrdRm8G5YYJdk4Bw",
  authDomain: "chattelegraph.firebaseapp.com",
  projectId: "chattelegraph",
  storageBucket: "chattelegraph.appspot.com",
  messagingSenderId: "157160792630",
  appId: "1:157160792630:web:473c5779fe1528a777ee97",
  measurementId: "G-RE523BP7MZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
