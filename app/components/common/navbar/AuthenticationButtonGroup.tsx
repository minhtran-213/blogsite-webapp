'use client'

import PrimaryButton from '../PrimaryButton'
import React from 'react'
import SecondaryButton from '../SecondaryButton'
import { useRouter } from 'next/navigation'

const AuthenticationButtons = () => {
  const router = useRouter()

  const handleLogin = () => {
    router.push('/login')
  }

  const handleRegister = () => {
    router.push('/register')
  }

  return (
    <>
      <SecondaryButton callback={handleRegister} name='Join'/>
      <PrimaryButton callback={handleLogin} name="Login"/>
    </>
  )
}

export default AuthenticationButtons