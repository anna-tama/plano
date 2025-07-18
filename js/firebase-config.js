// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuf79iRDRi0oZ000RToY-_5KKaECUWw4s",
  authDomain: "plano-3c4f3.firebaseapp.com",
  projectId: "plano-3c4f3",
  storageBucket: "plano-3c4f3.firebasestorage.app",
  messagingSenderId: "839895261127",
  appId: "1:839895261127:web:2826d9d464d1e48dab03e2"
};

// Inicializa Firebase solo si no existe
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const db = firebase.firestore();

// Hacerla accesible globalmente (opcional)
window.db = db; // Solo si es estrictamente necesario