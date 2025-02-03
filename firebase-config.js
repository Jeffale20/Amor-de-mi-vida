// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de Firebase (extraída de tu Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDYUQzwhgmwECkzELbwW4Q0pGL7TfKentI",
  authDomain: "base-76b77.firebaseapp.com",
  projectId: "base-76b77",
  storageBucket: "base-76b77.appspot.com",
  messagingSenderId: "143742458585",
  appId: "1:143742458585:web:e7ddc9c55992c4d546fcc8",
  measurementId: "G-RFQ5PR96V1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar la base de datos para usar en otros archivos
export { db, collection, addDoc, onSnapshot, deleteDoc, doc };
