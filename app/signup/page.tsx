'use client'

import Button from "@/components/Button";
import ImageWrapper from "@/components/ImageWrapper";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
//@ts-ignore
import { User, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase"; // Assuming you have exported auth and db from firebase.ts
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import {dashboardRedirect} from "@/helper/auth";
export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(true)
    const router = useRouter()
    //Add users to database
    async function signup(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        // Check if email and password fields are not empty
        if (!email || !password) {
            toast.error('Please enter both email and password');
            return;
        }

        // Check if password meets complexity requirements
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error(`
                Password must be at least 8 characters long and contain 
                at least one uppercase letter, one lowercase letter, one digit, 
                and one special character`
            );
            return;
        }

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

            const incomeData = {
                types: [{
                    name: 'Paycheck',
                    planned: 0,
                    spent: 0
                }],
                user_id: auth.currentUser?.uid,
            }

            // Add the document to a collection
            try {
                const addDefaultIncome = await addDoc(collection(db, 'income'), incomeData)
                console.log('Document written')
            } catch (e) {
                console.error('Error adding document: ', e)
            } finally {
                toast.success('Account created successfully');
                router.push('/dashboard');
            }

        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                console.log('Email already in use, redirecting to dashboard...');
                toast.error('Email already in use');
                router.push('/dashboard');
            } else {
                console.error('Error signing up:', error);
                toast.error('Error signing up');
                // You can show an error message to the user here
            }
        }
    }

    useEffect(() => {
        dashboardRedirect(setUser, setAuthenticated, router)
    }, [router])


    if (!authenticated) {
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
                                className="h-10 p-3  border-2 rounded-md"
                            />
                            <Toaster richColors duration={2500} position="top-center"/>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-dark font-main" htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="h-10 p-3 border-2 rounded-md"
                            />
                        </div>

                        <button
                            type="submit"
                            className='px-4 mt-3 h-12 bg-green-primary text-white font-primary rounded-full'>
                            Create Account
                        </button>
                    </form>

                </main>
                <p className="text-center mt-5 font-semibold">
                    Already have an account? <Link className="text-green-primary" href="/login">Login.</Link>
                </p>
            </div>
        )
    }
}
