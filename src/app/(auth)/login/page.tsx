import React from 'react'
import LoginForm from '@/components/Forms/LoginForm'
import Header from '@/components/CustomUI/Header'

const Login = () => {
    return (
        <main className='w-full h-screen flex_center flex-col'>
            <Header />

            <div className="w-full h-full flex_center">
                <LoginForm />
            </div>
        </main>
    )
}

export default Login