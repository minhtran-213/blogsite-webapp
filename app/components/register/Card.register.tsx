'use client'
import React, { useState } from 'react'
import CustomDatePicker from '../common/CustomDatePicker'
import { ArrowBack, Eye, EyeClosed } from '../common/svgs'


interface TextBoxWithLabelProps {
    placeholder: string;
    labelName: string;
    type: string;
    hasIcon?: boolean;
    icon?: React.ReactNode;
    isPassword?: boolean;
    infoTooltip?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextBoxWithLabel: React.FC<TextBoxWithLabelProps>  = ({
    placeholder,
    labelName,
    type,
    isPassword = false,
    infoTooltip = '',
    value,
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
    items: string[]
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
            <select className="select select-bordered w-full">
                {props.items.map((item, index) => (<option value={item} key={index}>{item}</option>))}
            </select>
        </label>
    )
}

const RegistrationFlowOne = () => {
    return (
        <>
            <TextBoxWithLabel value='' onChange={() => console.log('test')} labelName='Email *' placeholder='olie.ax@gmail.com' type='text'/>
            <TextBoxWithLabel value='' onChange={() => console.log('test')} labelName='First name *' placeholder='Oliver' type='text'/>
            <TextBoxWithLabel value='' onChange={() => console.log('test')} labelName='Last name' placeholder=' Axios' type='text'/>
            <TextBoxWithLabel value='' onChange={() => console.log('test')} labelName='Display name' placeholder='Oliver the Green Arrow' type='text'/>
        </>
    )
}


const RegistrationFlowTwo = () => {
    return (
        <>
            <CustomDatePicker labelName='Date of Birth *' />
            <SelectBoxWithLabel labelName='Gender' items={genderList.map(item => item.label)}/>
            <SelectBoxWithLabel labelName='What best describe you?' items={genderList.map(item => item.label)}/>
            <SelectBoxWithLabel labelName='What are your interests?' items={genderList.map(item => item.label)}/>
        </>
    )
}

const RegistrationFlowThree = () => {
    return (
        <>
            <TextBoxWithLabel 
                isPassword={true}
                labelName='Password *' 
                placeholder='Enter your password here' 
                type='password'
                value=''
                infoTooltip='test'
                onChange={() => console.log('test')}
                />
            <TextBoxWithLabel labelName="Confirm password *"
              placeholder="Confirm your password"
              type="password"
              isPassword={true}
              value=''
              onChange={() => console.log('first')}/>
        </>
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
                <div className='pb-8'>
                    {renderStepForm()}
                </div>
                <button onClick={handleNextStep} className='btn btn-secondary'>{step === 3 ? 'Submit': 'Next'}</button>
            </div>
        </div>
    )
}

export default RegisterCard