import { Eye, EyeClosed } from '../svgs'
import React, { useState } from 'react'

import { cn } from '@/app/utils/utils'
import useDetectBrowser from '@/app/hooks/useDetectBrowser'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const PasswordInput: React.FC<InputProps> = (
  { name, className, label, ...props },
  ref
) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const browser = useDetectBrowser()
  const togglePassword = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }
  return (
    <label className="form form-control w-full pb-3">
      {label && (
        <div className="label">
          <span className="label-text text-zinc-950 font-medium">{label}</span>
        </div>
      )}
      <div className="relative">
        <input
          name={name}
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          className={cn(
            'w-full input input-bordered data-[invalid]:ring-error',
            className
          )}
          // ref={ref}
          {...props}
        />
        {browser !== 'Edge' && (
          <button
            onClick={togglePassword}
            className="absolute flex justify-around top-1/2  right-6 -translate-y-1/2 text-lg"
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </button>
        )}
      </div>
    </label>
  )
}

export default PasswordInput
