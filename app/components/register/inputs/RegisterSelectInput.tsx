import React from 'react'

interface SelectInputProps {
    label: string,
    items: string[],
    error?: string,
    register: any // register function from useForm
    name: string
}

const RegisterSelectInput: React.FC<SelectInputProps> = ({label, items, error, register, name, ...rest}) => {
  return (
    <label className='form form-control w-full pb-3'>
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
        <select {...register(name)} {...rest} className="select select-bordered w-full">
            {items.map((item, index) => (<option value={item} key={index}>{item}</option>))}
        </select>
        {error && <span className='text-error text-sm pt-2'>{error}</span>}
    </label>
  )
}

export default RegisterSelectInput