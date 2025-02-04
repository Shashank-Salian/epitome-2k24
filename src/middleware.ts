import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';

const { auth } = NextAuth(authConfig)

export default async function middleware(req: NextRequest) {
    const session = await auth();

    const { nextUrl } = req;
    const isLoggedIn = !!session
    const isProtectedRoutes = protectedRoutes.some(route => nextUrl.pathname === route);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        return NextResponse.next();
    }
    if (!isLoggedIn && isProtectedRoutes) {
        return NextResponse.redirect(new URL('/login', nextUrl));
    }
    return NextResponse.next();
}


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    unstable_allowDynamic: [
        '/node_modules/mongoose/dist/browser.umd.js',
    ],
}