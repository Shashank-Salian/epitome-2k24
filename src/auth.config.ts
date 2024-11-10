import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { SignToken } from "./lib/jwt"
import { connectDB } from "./lib/database"
import bcrypt from "bcryptjs"
import axios from "axios"

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
                    const userExists = await axios.post(`${process.env.NEXTAUTH_URL}/api/post/user`, { email: credentials?.email, getPassword: true })
                    const matchPassword = await bcrypt.compare(credentials?.password as string, userExists?.data?.password)

                    if (!userExists?.data?.email || !matchPassword) throw new Error("Invalid Email or Password")

                    const userData = {
                        username: userExists?.data?.username,
                        email: userExists?.data?.email,
                        picture: userExists?.data?.picture,
                    }
                    user = userData

                    console.log("\nCredentials:", user)
                    return user
                } catch (err) {
                    console.log("\nCredentialsErr: ", err)
                    return null
                }
            },

        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // console.log("\nSinin_Callback", { user, account, profile })
            if (account?.type === 'credentials' && user !== null) {
                console.log("\nSignIn_Callback: Cred User Allowed")
                return true
            } else {
                try {
                    // await connectDB()
                    // const userExists = await UserModel.findOne({ email: profile?.email })
                    const userExists = await axios.post(`${process.env.NEXTAUTH_URL}/api/post/user`, { email: profile?.email })
                    if (!userExists?.data?.email) {
                        // await UserModel.create({
                        //     username: profile?.name,
                        //     email: profile?.email,
                        //     picture: profile?.picture,
                        // })

                        const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/post/registerOauthUser`, {
                            username: profile?.name,
                            email: profile?.email,
                            picture: profile?.picture,
                        })
                        console.log("\nOAuht signin : ", res.data)

                        if (res.status !== 201) {
                            throw new Error(res.data.message || "Failed to Create OAuth User")
                        }

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