'use client'

import Input from '../common/inputs/Input'
import { Logo } from '../common/svgs'
import PasswordInput from '../common/inputs/PasswordInput'
import React from 'react'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useSignIn } from '@clerk/nextjs'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

type FormValues = z.infer<typeof formSchema>

const LoginCard = () => {
  const router = useRouter()
  const { signIn, setActive, isLoaded } = useSignIn()
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })
  const onSubmit = async (data: FormValues) => {
    if (!isLoaded) {
      console.log('Is loaded')
      return null
    }

    try {
      if (signIn) {
        const response = await signIn.create({
          identifier: data.email,
          password: data.password,
        })

        if (response.status === 'complete') {
          setActive({ session: response.createdSessionId })
          router.push('/')
        }
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        if (error.errors) {
          const errorItem = error.errors[0]
          const field = errorItem.meta?.paramName
          if (field === 'password') {
            setError('password', { message: 'Password is incorrect' })
          } else if (field === 'identifier') {
            setError('email', { message: 'Email is not found' })
          } else {
            setError('root', { message: errorItem.longMessage })
          }
        }
      }
    }
  }

  return (
    <div className="grid w-full flex-grow items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8">
          <header className="grid place-items-center">
            <Logo className="w-44 h-44 pb-4" />
          </header>
          <div className="">
            <Input
              {...register('email')}
              label="Email"
              name="email"
              type="text"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-error font-medium text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <PasswordInput label="Password" {...register('password')} />
            {errors.password && (
              <p className="text-error font-bold text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <a className="pt-5 text-sm" href="/forgot-password">
            Forgot Password?
          </a>
          <button
            type="submit"
            className={`btn ${
              !isLoaded ? 'btn-disabled' : 'btn-secondary'
            } w-full`}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginCard
