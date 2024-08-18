'use client'
import React, { useState } from 'react'
import CustomDatePicker from '../common/CustomDatePicker'
import { ArrowBack, Eye, EyeClosed } from '../common/svgs'


interface TextBoxWithLabelProps {
    placeholder: string
    labelName: string
    type: string
    hasIcon?: boolean
    icon?: React.ReactNode
    isPassword?: boolean
    infoTooltip?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
}

interface FormValues {
    email: string,
    firstName: string,
    lastName?: string,
    displayName: string,
    dateOfBirth: Date,
    gender: string,
    occupation: string,
    interests: string[],
    password: string,
    confirmPassword: string,
  }

const TextBoxWithLabel: React.FC<TextBoxWithLabelProps>  = ({
    placeholder,
    labelName,
    type,
    isPassword = false,
    infoTooltip = '',
    value,
    name,
    onChange}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
            <label className='form form-control w-full npb-3'>
                <div className='label'>
                    <span className='label-text'>{labelName}</span>
                </div>  
                <div className="relative pr-5">
                    <input
                        name={name}
                        placeholder={placeholder}
                        type={isPassword ? (showPassword ? 'text' : 'password') : type}
                        value={value}
                        onChange={onChange}
                        className='input input-bordered w-full'
                    />
                    {isPassword && (
                        <button
                            type="button"
                            className="absolute top-1/2 right-8 -translate-y-1/2"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (<Eye />) : (<EyeClosed />)}
                        </button>
                    )}
                </div>
                {infoTooltip && (
                        <div className="tooltip tooltip-info" data-tip={infoTooltip}>
                            <button type="button" className="absolute -right-2 top-1/2 -translate-y-[2rem]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    )}
            </label>
)}

interface SelectBoxWithLabelProps {
    labelName: string,
    items: string[],
    name: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const genderList = [
    {
        value: 'MALE',
        label: 'Male'
    },
    {
        value: 'FEMALE',
        label: 'Female'
    },
    {
        value: 'OTHER',
        label: 'Other'
    }
]

const SelectBoxWithLabel = (props: SelectBoxWithLabelProps) => {
    return (
        <label className='form form-control w-full pb-3'>
            <div className="label">
                <span className="label-text">{props.labelName}</span>
            </div>
            <select onChange={props.onChange} name={props.name} className="select select-bordered w-full">
                {props.items.map((item, index) => (<option value={item} key={index}>{item}</option>))}
            </select>
        </label>
    )
}

const RegisterCard = () => {
    const [step, setStep] = useState<number>(1)

    const handleNextStep = () => {
        setStep(prevStep => prevStep + 1)
    }
    const handlePrevStep = () => {
        setStep(prevStep => prevStep - 1)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Current payload: ', formData)
    }

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (step !== 3) {
            e.preventDefault()
            handleNextStep()
        }
    }

    const [formData, setFormData] = useState<FormValues>({
        email: '',
        firstName: '',
        lastName: '',
        displayName: '',
        dateOfBirth: new Date(),
        gender: '',
        occupation: '',
        interests: [''],
        password: '',
        confirmPassword: '',
      })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault()
        const {value, name} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const RegistrationFlowOne = () => {
        return (
            <>
                <TextBoxWithLabel 
                    name='email'
                    value={formData.email}
                    onChange={handleOnChange} 
                    labelName='Email *' 
                    placeholder='olie.ax@gmail.com' 
                    type='text'/>
                <TextBoxWithLabel 
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleOnChange} 
                    labelName='First name *' 
                    placeholder='Oliver' 
                    type='text'/>
                <TextBoxWithLabel 
                    name='lastName'
                    value={formData.lastName || ''}
                    onChange={handleOnChange} 
                    labelName='Last name' 
                    placeholder=' Axios' 
                    type='text'/>
                <TextBoxWithLabel
                    name='preferredName'
                    value={formData.displayName}
                    onChange={handleOnChange} 
                    labelName='Display name' 
                    placeholder='Oliver the Green Arrow' 
                    type='text'/>
            </>
        )
    }
    
    
    const RegistrationFlowTwo = () => {
        return (
            <>
                <CustomDatePicker name='dateOfBirth' labelName='Date of Birth *' />
                <SelectBoxWithLabel
                    onChange={handleOnChange}
                    name='gender'
                    labelName='Gender' items={genderList.map(item => item.label)}/>
                <SelectBoxWithLabel
                    onChange={handleOnChange}
                    name='professional' 
                    labelName='What best describe you?' items={genderList.map(item => item.label)}/>
                <SelectBoxWithLabel 
                    onChange={handleOnChange}
                    name='interests' 
                    labelName='What are your interests?' items={genderList.map(item => item.label)}/>
            </>
        )
    }
    
    const RegistrationFlowThree = () => {
        return (
            <>
                <TextBoxWithLabel 
                    name='password'
                    isPassword={true}
                    labelName='Password *' 
                    placeholder='Enter your password here' 
                    type='password'
                    value=''
                    infoTooltip='test'
                    onChange={() => console.log('test')}
                    />
                <TextBoxWithLabel
                  name='confirmedPassword'
                  labelName="Confirm password *"
                  placeholder="Confirm your password"
                  type="password"
                  isPassword={true}
                  value=''
                  onChange={() => console.log('first')}/>
            </>
        )
    }

    const renderStepForm = () => {
        if (step === 1) {
            return <RegistrationFlowOne />
        }

        if (step === 2) {
            return <RegistrationFlowTwo />
        }

        if (step === 3) {
            return <RegistrationFlowThree />
        }
    }
    return (
        <div className='card bg-white shadow-lg'>
            <div className='card-body'>
                {step > 1 && 
                    <button onClick={handlePrevStep} className="btn btn-ghost btn-sm self-start">
                        <ArrowBack/>
                    </button>
                }
                <text className='text-2xl font-bold text-center py-10'>DevAI Writer</text>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if (step === 3) {
                        handleSubmit(e)
                    }
                }}>
                    <div className='pb-8'>
                        {renderStepForm()}
                        <button type='submit' onClick={handleButtonClick} 
                            className='btn btn-secondary'>
                                {step === 3 ? 'Submit': 'Next'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterCard