// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfXRNddR68pUtFbAj7sjpgV8LTNIMQ-Fg",
    authDomain: "amor-de-mi-vida-a363b.firebaseapp.com",
    projectId: "amor-de-mi-vida-a363b",
    storageBucket: "amor-de-mi-vida-a363b.firebasestorage.app",
    messagingSenderId: "1020308086889",
    appId: "1:1020308086889:web:e57f5dd55489723d7e82f8",
    measurementId: "G-6ML8QB2X6S"
  };
// Inicializa Firebase y Firestore (asegúrate de que esto esté en tu firebase-config.js)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Autenticar al usuario de forma anónima
signInAnonymously(auth)
  .then(() => {
    console.log("Usuario autenticado anónimamente");
  })
  .catch((error) => {
    console.error("Error al autenticar al usuario", error);
  });

export { auth, db, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc };