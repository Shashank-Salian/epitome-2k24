"use server"
import { connectDB } from "@/lib/database";
import { NextResponse } from "next/server";
import uniqid from "uniqid"
import sha256 from "sha256"
import axios from "axios"
import { redirect } from "next/dist/server/api-utils";

export async function eventPayment(props: any) {
    console.log("Payment_Props", props)
    const { userID, amount } = props
    const API_ENDPOINT = "/pg/v1/pay"

    try {
        const MERCHANT_TRANSACTION_ID = uniqid()
        const payload = {
            "merchantId": process.env.PHONEPE_MERCHANT_ID,
            "merchantTransactionId": MERCHANT_TRANSACTION_ID,
            "merchantUserId": userID,
            "amount": amount * 100,
            "redirectUrl": `${process.env.NEXTAUTH_URL + "/payment/" + MERCHANT_TRANSACTION_ID}`,
            "redirectMode": "REDIRECT",
            "callbackUrl": "https://webhook.site/callback-url",
            "mobileNumber": "9999999999",
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }

        // SHA256(base64 encoded payload + “/pg/v1/pay” +
        //     salt key) + ### + salt index
        const EncodedPayload = Buffer.from(JSON.stringify(payload) + API_ENDPOINT + process.env.PHONEPE_SALT_KEY).toString("base64")
        const xVerify = sha256(EncodedPayload) + "###" + process.env.PHONEPE_SALT_INDEX

        // const options = {
        //     method: 'post',
        //     url: `${process.env.PHONEPE_BASE_API + API_ENDPOINT}`,
        //     headers: {
        //         accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         'X-VERIFY': xVerify,
        //     },
        //     data: {
        //         request: EncodedPayload
        //     }
        // };

        const response = await axios.post(
            `${process.env.PHONEPE_BASE_API + API_ENDPOINT}`,
            { request: EncodedPayload },
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-VERIFY': xVerify,
                }
            }
        );
        console.log("Payment_Action :", response.data);
        const redirectURL = response.data.instrumentResponse.redirectInfo.url
        NextResponse.redirect(redirectURL)
        // return response.data
    } catch (err: any) {
        console.error("getUserByEmail :", err.message);
        return err.message
    }
}