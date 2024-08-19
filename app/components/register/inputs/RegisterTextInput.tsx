import React from 'react'

interface RegisterTextInputProps { 
    label: string
    error?: string
    type?: string
    placeholder: string
    register: any, //register method from useForm
    name: string
}

const RegisterTextInput: React.FC<RegisterTextInputProps> = ({label, error, type = 'text', placeholder, register, name, ...rest}) => {
  return (
    <label className='form form-control w-full pb-3'>
        <div className='label'>
            <span className='label-text'>{label}</span>
        </div>  
        <div className="relative">
            <input
                placeholder={placeholder}
                type={type}
                className={`input input-bordered w-full ${error && 'border-error'}`}
                {...register(name)}
                {...rest}
            />
        </div>
        {error && <span className='text-error text-sm pt-2'>{error}</span>}
    </label>
  )
}

export default RegisterTextInput