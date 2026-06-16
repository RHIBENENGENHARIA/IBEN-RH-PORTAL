import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "AIzaSyAvmQKLfk9fObilmnHKBSrrt6XZ1z5ZVjg",
  authDomain:        "portal-rh-6915c.firebaseapp.com",
  projectId:         "portal-rh-6915c",
  storageBucket:     "portal-rh-6915c.firebasestorage.app",
  messagingSenderId: "643924363708",
  appId:             "1:643924363708:web:61f37a6915960761e403b9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
