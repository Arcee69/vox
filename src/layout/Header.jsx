import React from 'react'
import Logo from "../assets/svg/logo.svg"

const Header = () => {
  return (
    <div 
        className='w-full h-[120px] py-[26px] px-[100px] flex items-center justify-between' 
    
    >
        <img src={Logo} alt='logo' />
        <div className='flex items-center gap-[48px]'>
            <p className='text-WHITE-_100 font-poppins'>About Us</p>
            <p className='text-WHITE-_100 font-poppins'>Product</p>
            <p className='text-WHITE-_100 font-poppins'>Feed</p>
        </div>
        <button className='w-[371px] p-4 rounded-lg bg-[#FF6600] '>
            <p className='text-[#fff] font-medium font-poppins text-lg text-center'>Request Free Consultation</p>
        </button>
    </div>
  )
}

export default Header