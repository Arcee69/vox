import React from 'react'
import Logo from "../assets/svg/logo.svg"
import { useNavigate } from 'react-router-dom'

const Footer = () => {

  const navigate = useNavigate()

  return (
    <div className='w-full mb-4 flex justify-center'>
      <div className='flex flex-col w-[250px] xl:w-full items-center gap-[22px]'>
        <img src={Logo} alt='Logo' />
        <p className='text-center'>© A product of <span className='underline cursor-pointer font-medium text-[#17053E]' onClick={() => window.open("https://cihanmediacomms.com", "_blank")}>CihanMedia</span> All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer