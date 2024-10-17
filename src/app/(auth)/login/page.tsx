import React from 'react'
import LoginForm from '@/components/Forms/LoginForm'
import { LandingHeader } from '@/components/CustomUI/Header'

const Login = () => {
    return (
        <main className='w-full h-screen flex_center flex-col'>
            <LandingHeader />

            <div className="w-full h-full flex_center">
                <LoginForm />
            </div>
        </main>
    )
}

export default Login