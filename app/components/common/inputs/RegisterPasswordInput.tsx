import { Eye, EyeClosed, ToolTip } from '../svgs'
import React, { useEffect, useState } from 'react'

interface RegisterTextInputProps { 
    label: string
    error?: string
    placeholder: string
    register: any, //register method from useForm
    name: string,
    isMatchedPassword?: boolean
}

const PasswordRequirements = `Password must contain:
 - At least 1 uppercase
 - At least 1 lowercase
 - At least 1 number
 - At least 1 special character
 - At least 8 characters long
`

const RegisterPasswordInput: React.FC<RegisterTextInputProps> = ({label, error, placeholder, register, name, isMatchedPassword, ...rest}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [borderColor, setBorderColor] = useState<string>('')
    useEffect(() => {
        if (name === 'confirmedPassword') {
            if (isMatchedPassword) {
                setBorderColor('border-success')
            } else {
                setBorderColor('border-error')
            }
        }
    }, [isMatchedPassword, name])
  return (
    <label className='form form-control w-full pb-3'>
        <div className='label'>
            <span className='label-text'>{label}</span>
        </div>  
        <div className="relative pr-5">
            <input
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                className={`input input-bordered w-full ${error ? 'border-error': borderColor}`}
                {...register(name)}
                {...rest}
            />
            <button className='absolute top-1/2 right-7 -translate-y-1/2 text-lg' onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <Eye /> : <EyeClosed />}
            </button>
        </div>
        <div className="tooltip tooltip-right tooltip-info absolute top-1/2 right-5 -translate-y-1/2 text-lg" 
            data-tip={PasswordRequirements}>
                <ToolTip className='cursor-help'/>
        </div>
        {error && <span className='text-error text-sm pt-2'>{error}</span>}
    </label>
  )
}

export default RegisterPasswordInput