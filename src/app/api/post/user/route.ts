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
            return NextResponse.json("User Not Found!", { status: 404 })
        }

        let userData
        if (getPassword) {
            userData = {
                uid: userExists?._id.toString(),
                username: userExists?.username,
                email: userExists?.email,
                picture: userExists?.picture,
                password: userExists?.password
            }
        } else {
            const latestPayment = userExists.payment?.sort((a: { paymentDate: number; }, b: { paymentDate: number; }) => b.paymentDate - a.paymentDate)[0] || null;

            userData = {
                uid: userExists?._id.toString(),
                username: userExists?.username,
                collegeName: userExists?.collegeName,
                email: userExists?.email,
                phone: userExists?.phone,
                picture: userExists?.picture,
                participants: userExists?.participants,
                paymentStatus: latestPayment?.paymentStatus || "PENDING",
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