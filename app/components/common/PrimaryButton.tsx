'use client'

import React from 'react'

type PrimaryButtonProps = {
    name: string,
    callback: () => void
}
const PrimaryButton = ({name, callback}: PrimaryButtonProps) => {
  return (
    <>
        <button className='btn btn-neutral px-7' onClick={callback}>{name}</button>
    </>
  )
}

export default PrimaryButton