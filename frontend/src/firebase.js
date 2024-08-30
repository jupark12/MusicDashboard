// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb7-UDUFRh41Es6Uqu16j3nRidNkGRpkk",
  authDomain: "music-wheel.firebaseapp.com",
  projectId: "music-wheel",
  storageBucket: "music-wheel.appspot.com",
  messagingSenderId: "301299265492",
  appId: "1:301299265492:web:1f31d1753d9757d356f041",
  measurementId: "G-DK1JXW9JRQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
