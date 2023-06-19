import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

console.log("init-firebase")
const firebaseConfig = {
  apiKey: "AIzaSyBz7YSzO7Yeo60Fy9S3vo5elqFDDzFKAvY",
  authDomain: "i9o-io.firebaseapp.com",
  projectId: "i9o-io",
  storageBucket: "i9o-io.appspot.com",
  messagingSenderId: "1084780990606",
  appId: "1:1084780990606:web:19975791ba42f4245479df",
  measurementId: "G-772C8BVB6Z"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);