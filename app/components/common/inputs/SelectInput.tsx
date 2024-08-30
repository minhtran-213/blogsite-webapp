import React from 'react'
import { cn } from '@/app/utils/utils'

interface InputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  items: string[]
}
const SelectInput: React.FC<InputProps> = ({ label, className, items }) => {
  return (
    <label className="form form-control w-full pb-3">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select className={cn('select select-bordered w-full', className)}>
        {items.map((item, idx) => (
          <option value={item} key={idx}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectInput
