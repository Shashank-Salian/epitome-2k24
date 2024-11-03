import { publicRoutes, authRoutes, ApiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';
import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { getToken } from 'next-auth/jwt';

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    console.log("\nMiddlewareToken : ", await getToken({ req: req, secret: process.env.AUTH_SECRET }))
    const isLoggedIn = !!await getToken({ req: req, secret: process.env.AUTH_SECRET })
    const isApiAuthRoute = nextUrl.pathname.startsWith(ApiAuthPrefix);
    const isPublicRoute = publicRoutes.some(route => nextUrl.pathname === route);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    console.log("\nMiddleware : ", { nextUrl, isLoggedIn, isApiAuthRoute, isPublicRoute, isAuthRoute })

    if (isApiAuthRoute) {
        console.log("M_Redirect : isApiAuthRoute")
        return NextResponse.next();
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            console.log("M_Redirect : isLoggedIn")
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        console.log("M_Redirect : isAuthRoute")
        return NextResponse.next();
    }
    if (!isLoggedIn && !isPublicRoute) {
        console.log("M_Redirect : isAuthRoute")
        return NextResponse.redirect(new URL('/login', nextUrl));
    }
    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
    unstable_allowDynamic: [
        '/node_modules/mongoose/dist/browser.umd.js',
    ],
};