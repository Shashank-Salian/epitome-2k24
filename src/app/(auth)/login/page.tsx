import Header from '@/components/CustomUI/Header'
import LoginForm from '@/components/Forms/LoginForm'
import React from 'react'

const Login = () => {
    return (
        <div className='w-full h-screen'>
            <Header />

            <div className="w-full h-full flex_center">
                <LoginForm />
            </div>
        </div>
    )
}

export default Login