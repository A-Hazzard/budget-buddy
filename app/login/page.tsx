'use client'
import ImageWrapper from "@/components/ImageWrapper";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
//@ts-ignore
import { User, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { Toaster, toast } from 'sonner'
import { dashboardRedirect } from "@/helper/auth";

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(true)
    const router = useRouter()

    async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    // Check if email and password fields are not empty
    if (!email || !password) {
        toast.error('Please enter both email and password');
        return;
    }

    try {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in successfully!");
        router.push('/dashboard');
    } catch (error: any) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            console.log('Invalid email or password');
            toast.error('Invalid email or password');
        } else if (error.code === 'auth/too-many-requests') {
            console.log('Too many login attempts, please try again later');
            toast.error('Too many login attempts, please try again later');
        } else {
            console.error("Error logging in:", error);
            toast.error('Invalid email or password');
        }
    }
}

    useEffect(() => {
        dashboardRedirect(setUser, setAuthenticated, router)

    }, [router])

    if (!authenticated) {
        return (
            <div className="px-5">
                <Link href="/" className="hover:cursor-pointer">
                    <ImageWrapper divClassName="w-28 h-28" src="/logo.svg" alt="logo" />
                </Link>

                <main className="p-5 md:w-[50%] mx-auto rounded-lg shadow-lg flex flex-col justify-center">
                    <div className="flex flex-col items-center">
                        <h1>Sign In</h1>
                        <p>To start Budgeting right</p>
                    </div>

                    <form onSubmit={login} className="flex flex-col items-left mt-5">
                        <Toaster richColors duration={2500} position="top-center" />
                        <div className="flex flex-col">
                            <label className="text-dark font-main" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="h-10 p-3  border-2 rounded-md"
                            />
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
                            className='px-4 h-12 bg-blue-primary text-white font-primary rounded-full  mt-3'>
                                Sign In
                        </button>
                        <Link className="mt-3 text-blue-primary font-semibold text-center" href="/reset">Forgot Password?</Link>

                    </form>

                </main>

                <p className="text-center mt-5 font-semibold">
                    Don&apos;t have an account? <Link className="text-blue-primary" href="/signup">Create an account.</Link>
                </p>
            </div>
        )
    }
}
