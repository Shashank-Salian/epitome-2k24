import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
    email: string,
    collegeName: string,
    department: string,
    phone: string,
    accomodationRequired: boolean,
}

export async function POST(request: NextRequest) {
    const { email, collegeName, department, phone, accomodationRequired }: RequestBody = await request.json()

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
        userExists.department = department
        userExists.phone = phone
        userExists.accomodationRequired = accomodationRequired

        await userExists.save();

        return NextResponse.json({ user: userExists, message: "User Updated Successfully!" }, { status: 201 });
    } catch (err: any) {
        console.error("User_Update :", err);
        return NextResponse.json(err.message, { status: 500 });
    }
}