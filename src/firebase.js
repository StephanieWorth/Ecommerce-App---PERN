// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvnkJAvwoK4F-s9KrlHqK4BZM2HFvWtnc",
  authDomain: "ecommerce-pern-126ac.firebaseapp.com",
  projectId: "ecommerce-pern-126ac",
  storageBucket: "ecommerce-pern-126ac.appspot.com",
  messagingSenderId: "166901514088",
  appId: "1:166901514088:web:62788c949a4193fd7920dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;