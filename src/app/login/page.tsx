"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            ...data,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid credentials");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="clay-card p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold gradient-text-clay mb-2">Welcome Back</h2>
                        <p className="text-[#6B6B6B]">Sign in to your account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border-2 border-rose-200 text-rose-700 rounded-2xl text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="clay-label">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                className="clay-input"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="clay-label">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                className="clay-input"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="clay-btn w-full"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-[#6B6B6B]">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-[#92487A] hover:text-[#A05589] font-semibold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
