"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Define pages that should be full width (no sidebar margin)
    const isFullWidth = pathname === "/" || pathname === "/login" || pathname === "/signup";

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            <Sidebar />
            <main
                className={`flex-1 min-h-screen transition-all duration-300 pt-16  lg:pt-0 ${isFullWidth ? 'w-full' : 'lg:ml-64'
                    }`}
            >
                {children}
            </main>
        </div>
    );
}
