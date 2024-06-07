'use client'

import Button from "@/components/Button";
import ImageWrapper from "@/components/ImageWrapper";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
//@ts-ignore
import { User, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase"; // Assuming you have exported auth and db from firebase.ts
import { useRouter } from 'next/navigation'
export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(true)
    const router = useRouter()
    //Add users to database
    async function signup(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        try {
            //Create new user
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            console.log(user);

            //Add user to firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
            });

            console.log('User Signed up');
            router.push('/dashboard');
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                console.log('Email already in use, redirecting to dashboard...');
                router.push('/dashboard');
            } else {
                console.error('Error signing up:', error);
                // You can show an error message to the user here
            }
        }
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user: User) => {
            if (user) {
                setUser(user);
                router.replace('/dashboard')
            }else setAuthenticated(false)
            
        });
    }, [router])


    if(!authenticated){
        return (
            <div className="px-5">
                <ImageWrapper divClassName="w-28 h-28" src="/logo.svg" alt="logo" />

                <main className="p-5 md:w-[50%] mx-auto rounded-lg shadow-lg flex flex-col justify-center">
                    <div className="flex flex-col items-center">
                        <h1>Create an Account</h1>
                        <p>To start Budgeting right</p>
                    </div>

                    <form onSubmit={signup} className="flex flex-col items-left mt-5">
                        <div className="flex flex-col">
                            <label className="text-dark font-main" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="h-10  border-2 rounded-md"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-dark font-main" htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="h-10 border-2 rounded-md"
                            />
                        </div>

                        <Button className="mt-3" text="Create Account" />
                    </form>

                </main>
                <p className="text-center mt-5 font-semibold">
                    Already have an account? <Link className="text-blue-primary" href="/login">Login.</Link>
                </p>
            </div>
        )
    }
}
