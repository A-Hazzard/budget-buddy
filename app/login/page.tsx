import Button from "@/components/Button";
import ImageWrapper from "@/components/ImageWrapper";
import Link from "next/link";

export default function page() {
    return (
        <div className="px-5">
            <Link href="/" className="hover:cursor-pointer">
                <ImageWrapper divClassName="w-28 h-28" src="/logo.svg" alt="logo" />
            </Link>

            <main className="p-5 w-[50%] mx-auto rounded-lg shadow-lg flex flex-col justify-center">
                <div className="flex flex-col items-center">
                    <h1>Sign In</h1>
                    <p>To start Budgeting right</p>
                </div>

                <form className="flex flex-col items-left mt-5">
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

                    <Button className="mt-3" text="Sign In" />

                    <Link className="mt-3 text-blue-primary font-semibold text-center" href="/reset">Forgot Password?</Link>

                </form>

            </main>

            <p className="text-center mt-5 font-semibold">
                Don&apos;t have an account? <Link className="text-blue-primary" href="/signup">Create an account.</Link>
            </p>
        </div>
    )
}
