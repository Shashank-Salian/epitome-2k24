import { auth } from "@/auth";
import { publicRoutes, authRoutes, ApiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';
import { NextResponse } from "next/server";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(ApiAuthPrefix);
    const isPublicRoute = publicRoutes.some(route => nextUrl.pathname === route);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // console.log({ nextUrl, isLoggedIn, isApiAuthRoute, isPublicRoute, isAuthRoute })

    if (isApiAuthRoute) {
        return NextResponse.next();
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/login', nextUrl));
    }
    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
    unstable_allowDynamic: [
        '/lib/database.ts',
    ],
};