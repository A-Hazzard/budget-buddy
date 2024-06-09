import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
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