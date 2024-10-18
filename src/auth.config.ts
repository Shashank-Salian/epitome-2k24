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
                        uid: userExists?._id,
                        username: userExists?.username,
                        collegeName: userExists?.collegeName,
                        email: userExists?.email,
                        picture: userExists?.picture,
                        isVerified: userExists?.isVerified,
                    }

                    const accessToken = await SignToken(userData)
                    user = { ...userData, accessToken }

                    return user
                } catch (err) {
                    console.log(err)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log("\nSignInCallback", { user, account, profile, email, credentials })

            if (account?.type === 'credentials' && user !== null) return true

            try {
                await connectDB()
                const userExists = await UserModel.findOne({ email: profile?.email })
                if (!userExists) {
                    await UserModel.create({
                        username: profile?.name,
                        email: profile?.email,
                        picture: profile?.picture,
                    })

                    // console.log("NewOAuth User")
                } else {
                    // console.log("OAuth User Exisits")
                    // Update profile picture only if they dont match
                    if (profile?.picture?.length !== 0 && userExists.picture !== profile?.picture) {
                        userExists.picture = profile?.picture
                        await userExists.save()
                    }
                }
                return true
            } catch (err) {
                console.log("Signin_Callback_Err", err)
                return false
            }

            return true
        },
    },
} satisfies NextAuthConfig