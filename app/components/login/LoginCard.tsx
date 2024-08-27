'use client'

import Input from '../common/inputs/Input'
import { Logo } from '../common/svgs'
import PasswordInput from '../common/inputs/PasswordInput'
import React from 'react'
import { useForm } from 'react-hook-form'

const LoginCard = () => {
  const { setValue, register } = useForm()

  return (
    <div className="grid w-full flex-grow items-center justify-center">
      <form>
        <div className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8">
          <header className="grid place-items-center">
            <Logo className="w-44 h-44 pb-4" />
          </header>
          <div className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="text"
              placeholder="Enter your email"
            />
            {/*error*/}
          </div>
          <PasswordInput label="Password" />
          {/*error*/}
          <a className="pt-5 text-sm" href="/forgot-password">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  )
}

export default LoginCard
