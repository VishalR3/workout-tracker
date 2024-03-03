// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APP_API_KEY,
  authDomain: "gymkhana-f7b4f.firebaseapp.com",
  projectId: "gymkhana-f7b4f",
  storageBucket: "gymkhana-f7b4f.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_APP_MSG_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const fireDB = getFirestore(app);

export default app;
