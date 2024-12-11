import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
    userId: string,
    email: string,
    collegeName: string,
    recieptUrl: string,
    uploadAt: string
}

export async function POST(request: NextRequest) {
    const { userId, email, collegeName, recieptUrl, uploadAt }: RequestBody = await request.json()

    if (!userId || !email || !collegeName || !recieptUrl || !uploadAt) {
        throw new Error("Invalid Reciept Details!")
    }

    try {
        await connectDB();
        const userExists = await UserModel.findOne({ email: email })
        if (!userExists) {
            throw new Error("User Not Found!")
        }

        userExists.payment.push({
            userId: userId,
            email: email,
            collegeName: collegeName,
            amount: 1500,
            paymentStatus: "PROCESSING",
            recieptUrl: recieptUrl,
            uploadAt: uploadAt
        })

        await userExists.save();

        return NextResponse.json({ user: userExists, message: "Reciept Uploaded Successfully!" }, { status: 201 });
    } catch (err: any) {
        console.error("Upload Reciept :", err);
        return NextResponse.json(err.message, { status: 500 });
    }
}