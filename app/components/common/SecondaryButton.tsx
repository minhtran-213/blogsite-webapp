type SecondaryButtonProps = {
    name: string,
    callback: () => void
}

import React from 'react'

const SecondaryButton = ({name, callback}: SecondaryButtonProps) => {
  return (
    <>
        <button className='btn btn-outline px-6' onClick={callback}>{name}</button>
    </>
  )
}

export default SecondaryButton