import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsDEKNwImNgNF1ziyUYmtqLr7cp0q-FCI",
  authDomain: "demoforsociallogin.firebaseapp.com",
  projectId: "demoforsociallogin",
  storageBucket: "demoforsociallogin.appspot.com",
  messagingSenderId: "510574850067",
  appId: "1:510574850067:web:2fd217b487bf7cd4a80fe6",
  measurementId: "G-YTHQPLT4Z0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
