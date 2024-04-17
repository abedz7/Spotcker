import { initializeApp } from "firebase/app";// ייבוא הפונקציה לאתחול אפליקציית Firebase
import { getAuth } from "firebase/auth";// ייבוא הפונקציה להשגת מופע האימות מ-Firebase
import { getFirestore } from "firebase/firestore";// ייבוא הפונקציה להשגת מופע ה-Firestore

const firebaseConfig = {// הגדרת קונפיגורציה ל-Firebase

  apiKey: "AIzaSyCPqh-1B1jghQW6r6VqyXzoZdVeAV-7UdA",
  authDomain: "react-semetser.firebaseapp.com",
  projectId: "react-semetser",
  storageBucket: "react-semetser.appspot.com",
  messagingSenderId: "763858717682",
  appId: "1:763858717682:web:dd7381b3a5a5483b24796b",
  measurementId: "G-WGWESNC028"
};

const app = initializeApp(firebaseConfig);// אתחול האפליקציה עם הקונפיגורציה שהוגדרה
const auth = getAuth(app);// יצירת מופע אימות מהאפליקציה שהוקמה
const db = getFirestore(app);// יצירת מופע Firestore מהאפליקציה שהוקמה

export { auth , db };
