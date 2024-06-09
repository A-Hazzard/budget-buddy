import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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
let app;
let auth: Auth;
let db: Firestore; // Annotate db with Firestore type
let analytics;

try {
  // Initialize Firebase app
  app = initializeApp(firebaseConfig);

  // Initialize Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
  analytics = getAnalytics(app);
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

export { app, auth, db, analytics };