"use client"

// import { eventPayment } from '@/app/actions/PaymentActions'
import { Button } from '@/components/ui/button'
import useUserStore from '@/store/useUserStore'
// import axios from 'axios'
import React from 'react'

const Payment = () => {
    const { user } = useUserStore()

    const paymentData = {
        userID: user?.uid,
        amount: 100
    }

    const eventRegistration = async () => {
        // const res = await eventPayment(paymentData)
        // const res = await axios.post('api/post/payment', paymentData)
        // console.log("Payment_Response : ", res)
    }

    return (
        <div>
            <h1>Payment</h1>

            <Button onClick={eventRegistration}>PAY</Button>
        </div>
    )
}

export default Payment