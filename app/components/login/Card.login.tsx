'use client'

import {object, z} from 'zod'

import React from 'react'
import { useForm } from 'react-hook-form'

const schema = object({
    email: z.string(),
    password: z.string()
})

type FormFields = z.infer<typeof schema>


const LoginCard = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormFields>()
    
    return (
        <div className='card bg-white shadow-lg'>
            <text className="text-2xl font-bold text-center py-10">DevAI Writer</text>
            <form></form>
        </div>
    )
}

export default LoginCard