"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();

    // Don't show navbar on landing, login, or signup pages
    if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
        return null;
    }

    return (
        <nav className="glass-effect shadow-sm border-b border-white/40 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/dashboard" className="text-2xl font-bold gradient-text-clay hover:opacity-80 transition">
                        InvoiceApp
                    </Link>

                    {session && (
                        <div className="flex items-center space-x-8">
                            <Link
                                href="/dashboard"
                                className={`font-medium transition-all duration-200 ${pathname === "/dashboard"
                                        ? "text-[#92487A] font-semibold"
                                        : "text-[#6B6B6B] hover:text-[#92487A]"
                                    }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/profile"
                                className={`font-medium transition-all duration-200 ${pathname === "/profile"
                                        ? "text-[#92487A] font-semibold"
                                        : "text-[#6B6B6B] hover:text-[#92487A]"
                                    }`}
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white px-5 py-2 rounded-2xl font-medium transition-all duration-200 shadow-lg"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
