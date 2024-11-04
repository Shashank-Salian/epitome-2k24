import React from 'react'
import RegisterForm from "@/components/Forms/RegisterForm"
import Header from '@/components/CustomUI/Header'

const Register = () => {
    return (
        <main className='w-full h-screen flex_center flex-col'>
            <Header />

            <div className="w-full h-full flex_center">
                <RegisterForm />
            </div>
        </main>
    )
}

export default Register