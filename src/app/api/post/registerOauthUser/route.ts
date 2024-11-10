import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
    username: string,
    email: string,
    picture: string
}

export async function POST(request: NextRequest) {
    const { username, email, picture }: RequestBody = await request.json()

    console.log("UserEmail", email)
    if (!email) {
        throw new Error("Invalid Email!")
    }

    try {
        await connectDB();
        const userExists = await UserModel.findOne({ email: email })
        if (userExists) {
            throw new Error("User already Exists!")
        }

        await UserModel.create({
            username: username,
            email: email,
            picture: picture
        })

        return NextResponse.json({ message: "User Created Successfully!", status: 201 }, { status: 201 })
    } catch (err: any) {
        console.error("\nOAuthRegister :", err);
        return NextResponse.json(err.message, { status: 500 })

    }
}