import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcxsbhjTORDchSsyOKsSyTGKTi3cuzl9E",
  authDomain: "appp-860bd.firebaseapp.com",
  projectId: "appp-860bd",
  storageBucket: "appp-860bd.firebasestorage.app",
  messagingSenderId: "470497732980",
  appId: "1:470497732980:web:d6971290a7397b8452e421"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
