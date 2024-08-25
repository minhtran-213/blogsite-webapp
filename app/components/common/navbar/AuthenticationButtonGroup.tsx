'use client'

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

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
      <SignedOut>
        <SignUpButton>
          <SecondaryButton name='Join in' callback={handleRegister}/>
        </SignUpButton>
        <SignInButton>
          <PrimaryButton name='Login' callback={handleLogin}/>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton appearance={{
          elements: {
            rootBox: 'px-7',
            userButtonAvatarBox: 'w-10 h-10'
          }
        }}/>
      </SignedIn>
    </>
  )
}

export default AuthenticationButtons