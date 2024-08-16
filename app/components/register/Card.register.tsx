import React from 'react'

interface TextBoxWithLabelProps {
    placeholder: string,
    labelName: string,
    type: string
}

const TextBoxWithLabel = ({placeholder, labelName, type}: TextBoxWithLabelProps) => {
    return (
        <label className='form form-control w-full pb-3'>
            <div className='label'>
                <span className='label-text'>{labelName}</span>
            </div>
            <input placeholder={placeholder} 
            type={type}
            className='input input-bordered w-full max-w-s placeholder:content-center'/>
        </label>
    )
}

const RegistrationFlowOne = () => {
    return (
        <>
            <TextBoxWithLabel labelName='Email *' placeholder='olie.ax@gmail.com' type='text'/>
            <TextBoxWithLabel labelName='First name *' placeholder='Oliver' type='text'/>
            <TextBoxWithLabel labelName='Last name' placeholder=' Axios' type='text'/>
            <TextBoxWithLabel labelName='Display name' placeholder='Oliver the Green Arrow' type='text'/>
        </>
    )
}


const RegistrationFlowTwo = () => {
    
}

const RegisterCard = () => {
  return (
    <div className='card bg-white shadow-lg'>
        <div className='card-body'>
            <text className='text-2xl font-bold text-center py-10'>DevAI Writer</text>
            <div className='pb-8'>
                <TextBoxWithLabel labelName='Email *' placeholder='olie.ax@gmail.com' type='text'/>
                <TextBoxWithLabel labelName='First name *' placeholder='Oliver' type='text'/>
                <TextBoxWithLabel labelName='Last name' placeholder=' Axios' type='text'/>
                <TextBoxWithLabel labelName='Display name' placeholder='Oliver the Green Arrow' type='text'/>
            </div>
            <button className='btn btn-secondary'>Next</button>
        </div>
    </div>
  )
}

export default RegisterCard