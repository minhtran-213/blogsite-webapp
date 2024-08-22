'use client'

import {object, z} from 'zod'

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import RegisterTextInput from '../common/inputs/RegisterTextInput'
import RegisterPasswordInput from '../common/inputs/RegisterPasswordInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginRequest, LoginResponse } from '@/app/types/auth'
import { login } from '@/app/apis/auth'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'
import { ErrorResponse } from '@/app/types/custom-types'

const schema = object({
    email: z.string().min(1, 'Email is missing'),
    password: z.string().min(1, 'Password is missing')
})

type FormFields = z.infer<typeof schema>

const mapFromFormDataToLoginRequest = (data: FormFields): LoginRequest => {
    return {
        email: data.email,
        password: data.password
    }
}


const LoginCard = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormFields>({
        resolver: zodResolver(schema)
    })
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const request = mapFromFormDataToLoginRequest(data)
        try {
            const response = await login(request)
            if (response.data) {
                const data: LoginResponse = response.data
                localStorage.setItem('accessToken', data.accessToken)
                router.push('/')
            }
        } catch(error) {
            if (error instanceof AxiosError) {
                const response: ErrorResponse = error.response?.data
                console.log(response)
            }
        }
    }
    return (
        <div className='card bg-white shadow-lg'>
           <div className='card-body'>
                <text className="text-2xl font-bold text-center py-10">DevAI Writer</text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <RegisterTextInput 
                        name='email' 
                        register={register} 
                        label='Email'
                        error={errors.email?.message}
                        placeholder='Your email'/>
                    <div>
                        <RegisterPasswordInput
                            name='password'
                            placeholder='Password'
                            register={register}
                            label='Password'
                            error={errors.password?.message}
                        />
                        <div className='grid justify-center'>
                            <button type='submit' className="btn btn-secondary btn-bordered w-40">Log in</button>
                        </div>
                    </div>
                </form>
           </div>
        </div>
    )
}

export default LoginCard