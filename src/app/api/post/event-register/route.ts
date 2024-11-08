import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import { EventRegType } from "@/utils/EventList";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
    email: string,
    participantsDetails: EventRegType[]
}

export async function POST(request: NextRequest) {
    // export async function getUserByEmail(email: string) {
    const { email, participantsDetails }: RequestBody = await request.json()

    console.log("UserEmail", participantsDetails)
    if (!email || !participantsDetails) {
        throw new Error("Invalid Participants Details!")
    }

    try {
        await connectDB();
        const userExists = await UserModel.findOne({ email: email })
        if (!userExists) {
            throw new Error("User Not Found!")
        }

        userExists.events = participantsDetails.map(event => ({
            EventName: event.title,
            EventType: event.category,
            participants: event.participants
        }));

        console.log("\nParticipants Added", userExists);
        await userExists.save();

        return NextResponse.json(userExists, { status: 201 });
    } catch (err: any) {
        console.error("getUserByEmail :", err);
        return NextResponse.json(err.message, { status: 500 });
    }
}