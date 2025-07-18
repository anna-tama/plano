// Configuración de Firebase (reemplaza con tus propios datos)
const firebaseConfig = {
  apiKey: "AIzaSyDuf79iRDRi0oZ000RToY-_5KKaECUWw4s",
  authDomain: "plano-3c4f3.firebaseapp.com",
  projectId: "plano-3c4f3",
  storageBucket: "plano-3c4f3.firebasestorage.app",
  messagingSenderId: "839895261127",
  appId: "1:839895261127:web:2826d9d464d1e48dab03e2"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();