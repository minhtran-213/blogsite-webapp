import { Metadata } from 'next'
import React from 'react'
import RegisterCard from '../components/register/Card.register'

export const metadata: Metadata = {
  title: 'Registration'
}

const Register= () => {
  return (
    <div className='max-w-md mx-auto mt-8'>
        <h1 className='text-3xl font-bold text-center mb-6'>Welcome to DevAI Writer</h1>
        <RegisterCard/>
    </div>
  )
}

export default Register