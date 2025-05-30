// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBNqm-5fcR623450yuvyHVf0eYrGYArzHA",
  authDomain: "binge-box-c81ab.firebaseapp.com",
  projectId: "binge-box-c81ab",
  storageBucket: "binge-box-c81ab.firebasestorage.app",
  messagingSenderId: "620848952154",
  appId: "1:620848952154:web:6dbc076188a0b667797963",
  measurementId: "G-YN1H7VCGV4",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Firebase Auth instance

export { auth };
export const db = getFirestore(app);