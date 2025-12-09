// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg8fUQftkdtUZ7NuX4dMkqK8uFRgZ7_No",
  authDomain: "netflixgpt-bcc34.firebaseapp.com",
  projectId: "netflixgpt-bcc34",
  storageBucket: "netflixgpt-bcc34.firebasestorage.app",
  messagingSenderId: "770422049146",
  appId: "1:770422049146:web:3fc072e37434cf9d716ec3",
  measurementId: "G-5F2NV443ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(); 