import { protectedRoutes, authRoutes, DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';
import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig)
// export { auth } from "@/auth"

export default async function middleware(req: NextRequest) {
    const session = await auth();
    console.log("\nMiddlewre Session:", session)
    // export default auth(async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    //     console.log("\nMiddlewareToken : ", { secret: process.env.AUTH_SECRET, req }, await getToken({ req: req, secret: process.env.AUTH_SECRET }))
    const isLoggedIn = !!session
    const isProtectedRoutes = protectedRoutes.some(route => nextUrl.pathname === route);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    console.log("\nMiddleware : ", { nextUrl: nextUrl.pathname, isLoggedIn, isProtectedRoutes, isAuthRoute })

    if (isAuthRoute) {
        if (isLoggedIn) {
            console.log("M_Redirect : isLoggedIn")
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        console.log("M_Redirect : isAuthRoute")
        return NextResponse.next();
    }
    if (!isLoggedIn && isProtectedRoutes) {
        console.log("M_Redirect : isAuthRoute")
        return NextResponse.redirect(new URL('/login', nextUrl));
    }
    return NextResponse.next();
    // });
}

// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
//     unstable_allowDynamic: [
//         '/node_modules/mongoose/dist/browser.umd.js',
//     ],
// };

// 
// 

// export { auth } from "@/auth"

// export default async function middleware(request: NextRequest) {
//     const session = await auth();

//     const isProtected = protectedRoutes.some((route) =>
//       request.nextUrl.pathname.startsWith(route)
//     );

//     if (!session && isProtected) {
//       const absoluteURL = new URL("/", request.nextUrl.origin);
//       return NextResponse.redirect(absoluteURL.toString());
//     }

//     return NextResponse.next();
//   }

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    unstable_allowDynamic: [
        '/node_modules/mongoose/dist/browser.umd.js',
    ],
}