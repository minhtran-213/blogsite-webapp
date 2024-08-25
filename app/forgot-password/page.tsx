'use client'

import * as Clerk from '@clerk/elements/common'

import React, { useState } from 'react'
import { useAuth, useSignIn } from '@clerk/nextjs'

import { Logo } from '../components/common/svgs'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [secondFactor, setSecondFactor] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { isLoaded, signIn, setActive } = useSignIn()

  if (!isLoaded) {
    return null
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push('/')
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true)
        setError('')
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault()
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true)
          setError('')
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId })
          setError('')
        } else {
          console.log(result)
        }
      })
      .catch((err) => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage)
      })
  }

  return (
    <div className="grid place-content-center mt-8">
      <div className="grid w-full flex-grow items-center justify-center">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome back to DevAI Writer
        </h1>
        <div className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8">
          <header className="grid place-items-center">
            <Logo className="w-44 h-44 pb-4" />
            <h1 className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
              Forgot Password?
            </h1>
          </header>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
            }}
            onSubmit={!successfulCreation ? create : reset}
          >
            {!successfulCreation && (
              <>
                <label
                  className="text-sm font-medium text-zinc-950"
                  htmlFor="email"
                >
                  Please provide your email address
                </label>
                <input
                  className="input input-bordered"
                  type="email"
                  placeholder="e.g john@doe.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button className="btn btn-secondary">
                  Send password reset code
                </button>
                {error && <p>{error}</p>}
              </>
            )}

            {successfulCreation && (
              <>
                <label
                  className="text-sm font-medium text-zinc-950"
                  htmlFor="password"
                >
                  Enter your new password
                </label>
                <input
                  className="input input-bordered"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  className="text-sm font-medium text-zinc-950"
                  htmlFor="password"
                >
                  Verification Code
                </label>
                <input
                  className="input input-bordered"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button className="btn btn-secondary">Reset</button>
                {error && <p>{error}</p>}
              </>
            )}

            {secondFactor && (
              <p>2FA is required, but this UI does not handle that</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
