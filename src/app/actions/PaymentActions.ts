"use server"
import { ParticipantsListType } from "@/store/useEventRegister";

type Props = {
    participantsList: ParticipantsListType[]
}

export async function generateUPIURL(props: Props) {
    const { participantsList } = props

    if (participantsList.length <= 0) {
        throw new Error("Invalid Data List")
    }

    const participantCount = participantsList.length
    const amount = participantCount * 100

    const UPI_URL = `${process.env.UPI_BASE_URI}&am=${amount}&tn=AIMIT EPITOME IT Fest Registration`
    return UPI_URL
}