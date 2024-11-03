import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import UserModel from "./models/UserModel"
import { SignToken } from "./lib/jwt"
import { connectDB } from "./lib/database"
import bcrypt from "bcryptjs"

export default {
    providers: [
        Google,
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@email.com" },
                password: { label: "Password", type: "password", placeholder: "Enter Password" },
            },
            authorize: async (credentials) => {
                let user = null

                try {
                    if (!credentials?.email || !credentials?.password) {
                        return null
                    }

                    await connectDB()
                    const userExists = await UserModel.findOne({ email: credentials?.email, password: { $exists: true, $ne: null } })
                    const matchPassword = await bcrypt.compare(credentials?.password as string, userExists?.password)

                    if (!userExists || !matchPassword) throw new Error("Invalid Email or Password")

                    const userData = {
                        username: userExists?.username,
                        email: userExists?.email,
                        picture: userExists?.picture,
                    }
                    user = userData

                    // console.log("Credentials:", user)
                    return user
                } catch (err) {
                    console.log(err)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {

            if (account?.type === 'credentials' && user !== null) {
                // console.log("\nSignIn_Callback: Cred User Allowed")
                return true
            } else {
                try {
                    await connectDB()
                    const userExists = await UserModel.findOne({ email: profile?.email })
                    if (!userExists) {
                        await UserModel.create({
                            username: profile?.name,
                            email: profile?.email,
                            picture: profile?.picture,
                        })

                        // console.log("\nSignIn_Callback: NewOAuth User Created")
                    }
                    return true
                } catch (err) {
                    console.log("\nSignin_Callback_Err", err)
                    return false
                }
            }
        },
        async jwt({ token }) {
            const { email } = token

            try {
                const accessToken = await SignToken({ email })
                token = { email, accessToken }
            } catch (err) {
                console.error("JWT error:", err)
            }

            // console.log("\nJWT_Callback: Final User Token", token)
            return token
        },
        async session({ session, token }) {
            // console.log("\nSession_Final: ", { session, token })
            try {
                session.user = { ...token }
            } catch (err) {
                console.error("Session error:", err)
            }
            // console.log("\nSession_Final: ", session)

            return session
        }
    },
} satisfies NextAuthConfig