import React from 'react'
import { cn } from '@/app/utils/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, type, placeholder, className, ...props }, ref) => {
    return (
      <label className="form form-control w-full pb-3">
        {label && (
          <div className="label">
            <span className="label-text text-zinc-950 font-medium">
              {label}
            </span>
          </div>
        )}
        <input
          type={type}
          name={name}
          className={cn('input input-bordered', className)}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </label>
    )
  }
)

Input.displayName = 'Input'

export default Input
