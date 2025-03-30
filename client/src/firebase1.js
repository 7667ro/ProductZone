// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig1 = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_1,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_1,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_1,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_1,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_1,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_1
};

// Initialize Firebase
export const app1 = initializeApp(firebaseConfig1, "app1");