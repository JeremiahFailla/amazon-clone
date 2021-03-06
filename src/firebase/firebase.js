import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD78CLzb0oPzUaQ_-bjGu0x9mbyWlEJtns",
  authDomain: "clone-a3b0c.firebaseapp.com",
  projectId: "clone-a3b0c",
  storageBucket: "clone-a3b0c.appspot.com",
  messagingSenderId: "1065644495644",
  appId: "1:1065644495644:web:5cb2fdbb30e3ee776e20d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };
