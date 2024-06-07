//@ts-ignore
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBcpabocwOisr1Anu2QS-WpX96KMPy9Vv0',
  authDomain: 'budget-buddy-94c0a.firebaseapp.com',
  projectId: 'budget-buddy-94c0a',
  storageBucket: 'budget-buddy-94c0a.appspot.com',
  messagingSenderId: '445875554139',
  appId: '1:445875554139:web:413f5151ab4b8f1cff7c7e',
  measurementId: 'G-QJ04KE2C5P',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)
