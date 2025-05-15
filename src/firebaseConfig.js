import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAOopNGpmrViPA1dIisxPp7H0BN0_v1Lyk",
  authDomain: "app-orcai.firebaseapp.com",
  projectId: "app-orcai",
  storageBucket: "app-orcai.appspot.com",
  messagingSenderId: "636273244506",
  appId: "1:636273244506:web:8b940e8c30c37bec981b63",
  measurementId: "G-7Q5HF1JCEJ",
};

const app = initializeApp(firebaseConfig);

// 🔥 Autenticação Firebase
export const auth = getAuth(app);

// 🔥 Firestore
export const db = getFirestore(app);

// Opcional: Analytics
const analytics = getAnalytics(app);

export const storage = getStorage(app);
