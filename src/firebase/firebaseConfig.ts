import { initializeApp } from 'firebase/app';
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCAraV_er9Cnxdurw8Jpy6X_G6wAN8U5ow',
  authDomain: 'orbita-js.firebaseapp.com',
  projectId: 'orbita-js',
  storageBucket: 'orbita-js.firebasestorage.app',
  messagingSenderId: '90912955638',
  appId: '1:90912955638:web:e65df0b64a7eb8c67760d7',
  measurementId: 'G-Z4XMLRL9J2',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserSessionPersistence);
