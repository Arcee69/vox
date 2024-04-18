import React from 'react'
import Logo from "../assets/svg/logo.svg"

const Footer = () => {
  return (
    <div className='w-full mb-14 flex justify-center'>
      <div className='flex flex-col items-center gap-[22px]'>
        <img src={Logo} alt='Logo' />
        <p>© A product of CihanMedia All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer