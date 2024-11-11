import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
    email: string,
    accomodationRequired: boolean
}

export async function POST(request: NextRequest) {
    const { email, accomodationRequired }: RequestBody = await request.json()
    console.log("Accomodation_Update", { email, accomodationRequired })

    if (!email) {
        throw new Error("Invalid Update Details!")
    }

    try {
        await connectDB();
        const userExists = await UserModel.findOne({ email: email })
        if (!userExists) {
            throw new Error("User Not Found!")
        }

        userExists.accomodationRequired = accomodationRequired

        await userExists.save();

        return NextResponse.json({ user: userExists, message: "Accomodation Updated Successfully!" }, { status: 201 });
    } catch (err: any) {
        console.error("Accomodation_Update :", err);
        return NextResponse.json(err.message, { status: 500 });
    }
}