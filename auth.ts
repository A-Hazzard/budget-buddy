import { app, db } from '@/firebase';
// firebaseConfig.ts (add authentication imports)
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user);
  } else {
    signInAnonymously(auth).catch((error) => {
      console.error('Anonymous sign-in failed:', error);
    });
  }
});

export { db, auth };