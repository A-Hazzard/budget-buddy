//@ts-ignore
import { getAuth } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
