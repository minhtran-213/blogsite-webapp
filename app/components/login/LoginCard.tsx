'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'

import { Eye, EyeClosed, Logo } from '../common/svgs'
import React, { useState } from 'react'

import useDetectBrowser from '@/app/hooks/useDetectBrowser'

const LoginCard = () => {
  const browser = useDetectBrowser()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePassword = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }
  return (
    <div className="grid w-full flex-grow items-center justify-center">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
        >
          <header className="grid place-items-center">
            <Logo className="w-44 h-44 pb-4" />
            <h1 className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
              Welcome back to DevAI Writer
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-4">
            <Clerk.Field name="identifier" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-zinc-950">
                Email
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="w-full input input-bordered data-[invalid]:ring-error"
              />
              <Clerk.FieldError className="block text-sm text-error" />
            </Clerk.Field>
          </div>
          <Clerk.Field name="password" className="space-y-2">
            <Clerk.Label className="text-sm font-medium text-zinc-950">
              Password
            </Clerk.Label>
            <div className="relative">
              <Clerk.Input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full input input-bordered data-[invalid]:ring-error"
              />
              {browser !== 'Edge' && (
                <button
                  onClick={togglePassword}
                  className="absolute flex justify-around top-1/2  right-6 -translate-y-1/2 text-lg"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              )}
            </div>
            <Clerk.FieldError className="block text-sm text-red-400" />
            <a className="pt-5 text-sm" href="/forgot-password">
              Forgot Password?
            </a>
          </Clerk.Field>
          <SignIn.Action submit className="w-full btn btn-neutral">
            Login
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  )
}

export default LoginCard
