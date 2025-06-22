// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';  // ← 追加

const firebaseConfig = {
  apiKey: "AIzaSyBZUZWmB6N5uwfeTAMLSSsbyeMDA2ybfQ",
  authDomain: "reactconect.firebaseapp.com",
  projectId: "reactconect",
  storageBucket: "reactconect.appspot.com",
  messagingSenderId: "402601877226",
  appId: "1:402601877226:web:16eb225a0056d383d44193"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);

// Firestore初期化 → dbとしてエクスポート
export const db = getFirestore(app); // ← 追加
