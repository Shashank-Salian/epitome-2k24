import { NextRequest, NextResponse } from "next/server";
import uniqid from "uniqid"
import sha256 from "sha256"
import axios from "axios"

export async function POST(request: NextRequest) {
    const { userID, amount } = await request.json()
    console.log("Payment_Props", { userID, amount })
    const API_ENDPOINT = "/pg/v1/pay"

    try {
        const MERCHANT_TRANSACTION_ID = uniqid()
        const payload = {
            "merchantId": process.env.PHONEPE_MERCHANT_ID,
            "merchantTransactionId": MERCHANT_TRANSACTION_ID,
            "merchantUserId": userID,
            "amount": amount * 100,
            "redirectUrl": `${process.env.NEXTAUTH_URL}/payment/${MERCHANT_TRANSACTION_ID}`,
            "redirectMode": "REDIRECT",
            "callbackUrl": `${process.env.NEXTAUTH_URL}/payment/${MERCHANT_TRANSACTION_ID}`,
            "mobileNumber": "9999999999",
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }

        console.log("\nPayment_Payload : ", payload)
        // SHA256(base64 encoded payload + “/pg/v1/pay” +
        //     salt key) + ### + salt index
        const EncodedPayload = Buffer.from(JSON.stringify(payload) + API_ENDPOINT + process.env.PHONEPE_SALT_KEY).toString("base64")
        const xVerify = sha256(EncodedPayload) + "###" + process.env.PHONEPE_SALT_INDEX
        console.log("\nPayment_Encode : ", { EncodedPayload, xVerify })

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

        return NextResponse.json({ url: redirectURL }, { status: 200 })
    } catch (err: any) {
        console.error("getUserByEmail :", err);
        return NextResponse.json(err.message, { status: 500 })

    }
}