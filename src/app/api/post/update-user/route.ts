import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
    email: string,
    collegeName: string,
    phone: string,
}

export async function POST(request: NextRequest) {
    const { email, collegeName, phone }: RequestBody = await request.json()
    console.log("User_Update", { email, collegeName, phone })

    if (!email || !collegeName || !phone) {
        throw new Error("Invalid Update Details!")
    }

    try {
        await connectDB();
        const userExists = await UserModel.findOne({ email: email })
        if (!userExists) {
            throw new Error("User Not Found!")
        }

        userExists.collegeName = collegeName
        userExists.phone = phone

        await userExists.save();

        return NextResponse.json("User Updated Successfully!", { status: 201 });
    } catch (err: any) {
        console.error("User_Update :", err);
        return NextResponse.json(err.message, { status: 500 });
    }
}