// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth/web-extension';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPUMzEeqK5q0OfvMzN_ugMZ37PgB8B494",
  authDomain: "ai-travel-planner-app-ce2f3.firebaseapp.com",
  projectId: "ai-travel-planner-app-ce2f3",
  storageBucket: "ai-travel-planner-app-ce2f3.firebasestorage.app",
  messagingSenderId: "831983541591",
  appId: "1:831983541591:web:390196175d02e24d0bf212",
  measurementId: "G-46ZGFW1YV6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)