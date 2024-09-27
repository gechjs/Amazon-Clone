import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnQvyyOEgCocQ_Vkp56r4gRkLy-q5CL-M",
  authDomain: "clone-de55a.firebaseapp.com",
  projectId: "clone-de55a",
  storageBucket: "clone-de55a.appspot.com",
  messagingSenderId: "407069275933",
  appId: "1:407069275933:web:948259e6ecbdd0d9f113f4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
