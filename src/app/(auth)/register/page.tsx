import React from 'react'
import RegisterForm from "@/components/Forms/RegisterForm"
import { LandingHeader } from '@/components/CustomUI/Header'

const Register = () => {
    return (
        <main className='w-full h-screen flex_center flex-col'>
            <LandingHeader />

            <div className="w-full h-full flex_center">
                <RegisterForm />
            </div>
        </main>
    )
}

export default Register