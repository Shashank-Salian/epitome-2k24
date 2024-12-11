import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs"

type RequestBody = {
    username: string,
    collegeName: string,
    department: string,
    phone: string,
    email: string,
    password: string,
    accomodationRequired: boolean,
}

export async function POST(request: NextRequest) {
    const { username, collegeName, department, phone, email, password, accomodationRequired }: RequestBody = await request.json()

    if (!email) {
        throw new Error("Invalid Email!")
    }

    try {
        await connectDB();
        const userExists = await UserModel.findOne({ email: email })
        if (userExists) {
            throw new Error("User already Exists!")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await UserModel.create({
            username: username,
            collegeName: collegeName,
            department: department,
            phone: phone,
            email: email,
            password: hashedPassword,
            accomodationRequired: accomodationRequired
        })

        return NextResponse.json({ message: "User Created Successfully!", status: 201 }, { status: 201 })
    } catch (err: any) {
        console.error("getUserByEmail :", err);
        return NextResponse.json(err.message, { status: 500 })

    }
}