import React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

import useDetectBrowser from '@/app/hooks/useDetectBrowser'

const Input: React.FC<InputProps> = ({ name, type, ...props }, ref) => {
  const browser = useDetectBrowser()
  return <input type={type} />
}

export default Input
