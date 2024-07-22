import React from 'react'
import { IoClose } from 'react-icons/io5'

import Logo from "../../assets/svg/logo.svg"

const Result = ({ handleClose, showResult }) => {
    console.log(showResult, "max-payne")

    return (
    <div className='bg-[#f6f6f6] mt-[100px] overflow-auto xl:mt-[10px] h-[580px] w-full py-5 xl:w-[500px] px-5 '>
        <div className='flex justify-end cursor-pointer' onClick={handleClose}>
            <IoClose className='text-lg'/>
        </div>
        <img src={Logo} alt='logo' className='w-[60px] h-[60px] cursor-pointer'/>
        <p className='text-[#19373E] font-inter font-medium text-[20px] text-center'>VoxRelease</p>
        <div className='mt-5 flex flex-col'>
            <p className='text-[#000] font-medium font-poppins text-base'>{showResult?.response}</p>
        </div>
    </div>
  )
}

export default Result