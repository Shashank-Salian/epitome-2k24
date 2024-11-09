import { connectDB } from "@/lib/database";
import UserModel from "@/models/UserModel";
import { EventRegType } from "@/utils/EventList";
import { NextRequest, NextResponse } from "next/server";

type ParticipantsListType = {
    name: string,
    phone: string,
    events: {
        eventName: string,
        eventType: string
    }[]
}

type RequestBody = {
    email: string,
    participantsDetails: EventRegType[]
    participantsList: ParticipantsListType[]
}

export async function POST(request: NextRequest) {
    // export async function getUserByEmail(email: string) {
    const { email, participantsDetails, participantsList }: RequestBody = await request.json()

    console.log("UserEmail", { participantsDetails, participantsList })
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
            eventName: event.title,
            eventType: event.category,
            participants: event.participants.map(p => ({
                name: p.name,
                phone: p.phone
            }))
        }));

        userExists.participants = participantsList.map(participant => ({
            name: participant.name,
            phone: participant.phone,
            events: participant.events.map(evnt => ({
                eventName: evnt.eventName,
                eventType: evnt.eventType
            }))
        }));

        // userExists.set({ participants: participantsList });

        console.log("\nParticipants Added", userExists);
        await userExists.save();

        return NextResponse.json(userExists, { status: 201 });
    } catch (err: any) {
        console.error("getUserByEmail :", err);
        return NextResponse.json(err.message, { status: 500 });
    }
}