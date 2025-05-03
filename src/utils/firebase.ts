
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA_iRRGa73OficH-sUtDi6mhmiBWiZcVcA",
  authDomain: "login-7d4cd.firebaseapp.com",
  databaseURL: "https://login-7d4cd.firebaseio.com",
  projectId: "login-7d4cd",
  storageBucket: "login-7d4cd.firebasestorage.app",
  messagingSenderId: "485899578987",
  appId: "1:485899578987:web:8fb2ca89976e99ee690b2e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

 const googleProvider = new GoogleAuthProvider();
 const microsoftProvider = new OAuthProvider('microsoft.com');
 const appleProvider = new OAuthProvider('apple.com');

export { app, auth, db,googleProvider,microsoftProvider,appleProvider };
