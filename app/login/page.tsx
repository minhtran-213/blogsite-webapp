import LoginCard from '@/app/components/login/LoginCard'
import React from 'react'

const login = () => {
  return (
    <div className='grid place-content-center mt-8'>
      <h1 className="text-3xl font-bold text-center mb-6">Welcome back to DevAI Writer</h1>
      <LoginCard />
    </div>
  )
}

export default login