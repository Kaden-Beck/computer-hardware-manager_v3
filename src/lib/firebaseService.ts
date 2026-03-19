import { initializeApp } from 'firebase/app';
import {} from 'firebase/auth';
import {} from 'firebase/app-check';
import {} from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'computer-hardware-bass.firebaseapp.com',
  projectId: 'computer-hardware-bass',
  storageBucket: 'computer-hardware-bass.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_APP_ID,
  appId: '1:897782812252:web:fd225b1609b68804426099',
};

export const firebaseService = initializeApp(firebaseConfig);
