import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCabKZdHK6K7lT3b_-E9hujYA_C6osWZ2A",
  authDomain: "xyz-hold-em.firebaseapp.com",
  projectId: "xyz-hold-em",
  storageBucket: "xyz-hold-em.firebasestorage.app",
  messagingSenderId: "353189443031",
  appId: "1:353189443031:web:6aa9dc2924ee726f454792",
  measurementId: "G-X6N1SPKWSB"
};

export const firebase_app = initializeApp(firebaseConfig);
