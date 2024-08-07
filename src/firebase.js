import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDzXMsA-Q_t5NOjzGZJA2-qacFOSsC2dUs",
  authDomain: "job-application-tracker-89991.firebaseapp.com",
  projectId: "job-application-tracker-89991",
  storageBucket: "job-application-tracker-89991.appspot.com",
  messagingSenderId: "701497406012",
  appId: "1:701497406012:web:fe8a01cea9815a50520939",
  measurementId: "G-LFFTFG17EE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
