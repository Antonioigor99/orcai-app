import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAOopNGpmrViPA1dIisxPp7H0BN0_v1Lyk",
  authDomain: "app-orcai.firebaseapp.com",
  projectId: "app-orcai",
  storageBucket: "app-orcai.appspot.com",
  messagingSenderId: "636273244506",
  appId: "1:636273244506:web:8b940e8c30c37bec981b63",
  measurementId: "G-7Q5HF1JCEJ"
};

const app = initializeApp(firebaseConfig);

// 🔥 Adicione esta linha para ativar a autenticação
export const auth = getAuth(app);

// (Opcional: mantenha analytics se quiser)
const analytics = getAnalytics(app);
