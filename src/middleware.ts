import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    // Protected routes
    const protectedRoutes = ["/dashboard", "/profile", "/invoices"];
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    // Redirect to login if accessing protected route without token
    if (isProtectedRoute && !token) {
        const url = new URL("/login", request.url);
        return NextResponse.redirect(url);
    }

    // Redirect to dashboard if accessing login/signup with token
    if ((pathname === "/login" || pathname === "/signup") && token) {
        const url = new URL("/dashboard", request.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/invoices/:path*", "/login", "/signup"],
};
