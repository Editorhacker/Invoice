"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            router.push("/login");
        } else {
            const json = await res.json();
            setError(json.message || "Something went wrong");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="clay-card p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold gradient-text-clay mb-2">Create Account</h2>
                        <p className="text-[#6B6B6B]">Start managing your invoices today</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 border-2 border-rose-200 text-rose-700 rounded-2xl text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="clay-label">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                className="clay-input"
                                placeholder="John Doe"
                                required
                            />
                        </div>
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
                            Create Account
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-[#6B6B6B]">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#92487A] hover:text-[#A05589] font-semibold">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
