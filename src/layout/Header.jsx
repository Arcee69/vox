import React from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from "../assets/svg/logo.svg"

const Header = () => {

  const navigate = useNavigate()

  return (
    <div 
      className='w-full h-[120px] py-[26px] px-[100px] flex items-center justify-between' 
    >
        <img src={Logo} alt='logo' onClick={() => navigate("/")} className='cursor-pointer'/>
        <div className='flex items-center gap-[48px]'>
            <p className='text-BLACK-_100 cursor-pointer font-poppins' onClick={() => navigate("/")}>Home</p>
            <p className='text-BLACK-_100 cursor-pointer  font-poppins' onClick={() => navigate("/insight-engine")}>Insight Engine</p>
            <p className='text-BLACK-_100 cursor-pointer  font-poppins' onClick={() => navigate("/sentiment-decoder")}> Sentiment Decoder</p>
        </div>
        
    </div>
  )
}

export default Header