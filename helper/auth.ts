import { useRouter } from 'next/navigation';
//@ts-ignore
import { auth } from '@/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

export const dashboardRedirect = (
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    router: ReturnType<typeof useRouter>
) => {
      const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          setUser(user);
          router.push('/dashboard');
        } else setAuthenticated(false);
      });
}

export const loginRedirect = (
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    router: ReturnType<typeof useRouter>
) => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push('/login');
      }
    });
}