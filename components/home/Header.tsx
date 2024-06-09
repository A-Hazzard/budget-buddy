"use client"

import Image from "next/image"
import {useRouter} from 'next/navigation'
import { auth } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
export default function Header() {
    // const isMobile = useMediaQuery({ maxWidth: 767 });
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
    }
  }, []);
  return (
    <header className="pb-4 pl-3 pr-3 border-b flex items-end justify-between">
        <div className="flex items-end gap-3">
            <div className="w-24">
                <Image 
                    src="/logo.svg"
                    alt="logo"
                    width={150} height={150}
                    priority
                />
            </div>

        </div>
      <button
        onClick={()=> user ? router.push('/dashboard') : router.push('/signup')}
        className={`px-4 h-12 bg-blue-primary text-white font-primary rounded-full`}>
        {user ? "Go to Dashboard" : "Create Account"}
      </button>
    </header>
  )
}
