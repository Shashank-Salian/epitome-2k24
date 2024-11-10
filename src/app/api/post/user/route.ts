import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
    email: string,
    getPassword: boolean
}

export async function POST(request: NextRequest) {
    // export async function getUserByEmail(email: string) {
    const { email, getPassword }: RequestBody = await request.json()

    console.log("UserEmail", email)
    if (!email) {
        throw new Error("Invalid Email!")
    }

    try {
        await connectDB();
        const userExists = await UserModel.findOne({ email: email })
        if (!userExists) {
            throw new Error("User Not Found!")
        }

        let userData
        if (getPassword) {
            userData = {
                uid: userExists?._id.toString(),
                username: userExists?.username,
                collegeName: userExists?.collegeName,
                email: userExists?.email,
                phone: userExists?.phone,
                picture: userExists?.picture,
                participants: userExists?.participants,
                events: userExists?.events,
                isVerified: userExists?.isVerified,
                createdAt: userExists?.createdAt.toISOString(),
                password: userExists?.password
            }
        } else {
            userData = {
                uid: userExists?._id.toString(),
                username: userExists?.username,
                collegeName: userExists?.collegeName,
                email: userExists?.email,
                phone: userExists?.phone,
                picture: userExists?.picture,
                participants: userExists?.participants,
                events: userExists?.events,
                isVerified: userExists?.isVerified,
                createdAt: userExists?.createdAt.toISOString()
            }
        }

        // console.log("\nuserData", userData)

        return NextResponse.json(userData, { status: 200 })
    } catch (err: any) {
        console.error("getUserByEmail :", err);
        return NextResponse.json(err.message, { status: 500 })

    }
}