'use client'

import { AxiosError, AxiosResponse } from 'axios'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import React, { useCallback, useEffect, useState } from 'react'
import { formatDate, genderList, getGenderLabelByValue } from '@/app/utils/utils'
import {object, z} from 'zod'

import { ArrowBack } from '../common/svgs'
import CustomDatePicker from '../common/CustomDatePicker'
import RegisterPasswordInput from './inputs/RegisterPasswordInput'
import RegisterSelectInput from './inputs/RegisterSelectInput'
import RegisterTextInput from './inputs/RegisterTextInput'
import { Value } from '@/app/types/custom-types'
import axiosClient from '@/app/apis/axiosInstance'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = object({
    email: z.string().email(),
    firstName: z.string().min(1, "First name is missing"),
    lastName: z.string().nullable(),
    displayName: z.string().nullable(),
    dateOfBirth: z.custom<Value>((val) => 
        val instanceof Date || 
        (Array.isArray(val) && (val[0] instanceof Date || val[0] === null) && (val[1] instanceof Date || val[1] === null)) || 
        val === null).nullable(),
    gender: z.enum(['Male', 'Female', 'Other']).nullable(),
    professional: z.string().nullable(),
    interests: z.string().nullable(),
    password: z.string(),
    confirmedPassword: z.string()
}).refine(data => data.confirmedPassword === data.password, {
    message: "Confirm password does not match",
    path: ['confirmedPassword']
})

type FormFields = z.infer<typeof schema>
const RegisterCard = () => {
    const [step, setStep] = useState<number>(1)
    const [passwordMatched, setPasswordMatched] = useState<boolean>(false)
    const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true)
    const router = useRouter()


    const nextStep = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (step < 3 && !isNextDisabled) {
            setStep((prevStep) => prevStep + 1)
        }
    }
    const backStep = (e: React.MouseEvent) => {
        e.preventDefault()
        setStep((prevStep) => prevStep - 1)
    }

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log("current Step: ", step)
        try {
            const response: AxiosResponse = await axiosClient.post('/auth/register', {...data, 
                preferredName: data.displayName, 
                dateOfBirth: formatDate(data.dateOfBirth), 
                gender: getGenderLabelByValue(data.gender ? data.gender : '')})
            console.log("response: ", response)
            router.push('/')
            
        } catch (error) {
            console.log("error: ", error)
            if (error instanceof AxiosError) {
                const data = error.response?.data
                setError('root', data.messages[0])
            }
        }
    }
    
    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
        watch,
        trigger,
        setError
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        mode: 'onChange'
    })

    const password = watch('password')
    const confirmedPassword = watch('confirmedPassword')

    useEffect(() => {
        if (confirmedPassword) {
            setPasswordMatched(password === confirmedPassword)
        }
    }, [password, confirmedPassword])

    const validateStep = useCallback(async () => {
        let fieldsToValidate: (keyof FormFields)[] = []
        switch(step) {
            case 1:
                fieldsToValidate = ['email', 'firstName', 'lastName', 'displayName']
                break
            case 2:
                fieldsToValidate = ['dateOfBirth', 'gender']
                break
            case 3:
                fieldsToValidate = ['password', 'confirmedPassword']
                break
        }
        const stepValid = await trigger(fieldsToValidate)
        setIsNextDisabled(!stepValid)
    }, [step, trigger])

    useEffect(() => {
        validateStep()
    }, [validateStep])

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (type === 'change') {
                validateStep()
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, validateStep])


    return (
        <div className='card bg-white shadow-lg'>
            <div className='card-body'>
                {step > 1 && 
                    <button onClick={backStep} className="btn btn-ghost btn-sm self-start">
                        <ArrowBack/>
                    </button>
                }
                <text className='text-2xl font-bold text-center py-10'>DevAI Writer</text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='pb-8'>
                        {step === 1 && (
                            <>
                               <RegisterTextInput
                                    name='email'
                                    label='Email *'
                                    placeholder='a.oliver@gmail.com'
                                    register={register}
                                    error={errors.email?.message}
                               />
                               <RegisterTextInput
                                    name='firstName'
                                    label='First Name *'
                                    placeholder='Axios'
                                    register={register}
                                    error={errors.firstName?.message}
                               />
                               <RegisterTextInput
                                    name='lastName'
                                    label='Last Name'
                                    placeholder='Oliver'
                                    register={register}
                                    error={errors.lastName?.message}
                               />
                               <RegisterTextInput
                                    name='displayName'
                                    label='Display Name'
                                    placeholder='Oliver Axios'
                                    register={register}
                                    error={errors.displayName?.message}
                               />
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <Controller
                                name='dateOfBirth'
                                control={control}
                                render={({field}) => (
                                    <CustomDatePicker
                                        label='Date of Birth'
                                        onChange={field.onChange}
                                        value={field.value}
                                     />
                                )}
                             />
                             <RegisterSelectInput
                                label='Gender'
                                items={genderList.map(gender => gender.label)}
                                register={register}
                                name='gender'
                              />
                              <RegisterSelectInput
                                label='What best describes you?'
                                items={['Software Engineer', 'AI Engineer', 'AI Researcher', 'Data analyst']}
                                register={register}
                                name='professional'
                              />
                              <RegisterSelectInput
                                label='What are you interested in?'
                                items={['Backend Development', 'Web development', 'AI Models']}
                                register={register}
                                name='interests'
                              />
                            </>
                        )}
                        {step === 3 && (
                           <>
                             <RegisterPasswordInput
                                name='password'
                                label='Password *'
                                placeholder='Password'
                                register={register}
                              />
                            <RegisterPasswordInput
                                name='confirmedPassword'
                                label='Confirmed Password *'
                                placeholder='Confirmed Password'
                                register={register}
                                isMatchedPassword={passwordMatched}
                              />
                           </>
                        )}
                    </div>
                    {step < 3 ? (
                        <button type='button' className={`btn btn-secondary btn-bordered w-full ${isNextDisabled? 'btn-disabled': ''}`} onClick={nextStep}>Next</button>
                    ) : (
                        <button className={`btn btn-secondary btn-bordered w-full ${isNextDisabled? 'btn-disabled': ''}`} type='submit'>Submit</button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default RegisterCard