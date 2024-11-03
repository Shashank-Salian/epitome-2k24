"use server"
import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import { UserTypes } from "@/store/useUserStore";
import * as bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

type RegisterUserType = {
    username: string,
    collegeName: string,
    phone: string,
    email: string,
    password: string
}

export async function registerUser({ username, collegeName, phone, email, password }: RegisterUserType) {
    if (!username || !collegeName || !email || !password) {
        throw new Error("Missing Input Fields")
    }

    try {
        await connectDB();
        const userExists = await UserModel.findOne({ email: email })
        if (userExists) {
            return NextResponse.json({ message: "User already Exists!" }, { status: 403 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await UserModel.create({
            username: username,
            collegeName: collegeName,
            phone: phone,
            email: email,
            password: hashedPassword
        })

        return NextResponse.json({ message: "User Created Successfully!" }, { status: 201 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


// Action to mannually add CollegeName if User was registered using Google OAuth
type AddCollegeNameType = {
    collegeName: string,
    email: string,
}

export async function addCollegeName({ collegeName, email }: AddCollegeNameType) {
    if (!collegeName || !email) {
        throw new Error("Invalid Input Fields")
    }

    try {
        await connectDB();
        const userExists = await UserModel.findOne({ email: email })
        if (!userExists) {
            throw new Error("Invalid User ID!")
        }

        userExists.collegeName = collegeName;
        await userExists.save()

        return NextResponse.json({ message: "Updated College Name!" }, { status: 201 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function getUserByEmail(email: string) {
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

        const userData = {
            uid: userExists?._id.toString(),
            username: userExists?.username,
            collegeName: userExists?.collegeName,
            email: userExists?.email,
            phone: userExists?.phone,
            picture: userExists?.picture,
            events: userExists?.events,
            isVerified: userExists?.isVerified,
            createdAt: userExists?.createdAt.toISOString()
        }

        console.log("\nuserData", userData)

        return userData as UserTypes
    } catch (err: any) {
        console.error("getUserByEmail :", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}