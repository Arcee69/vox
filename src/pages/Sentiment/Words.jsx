import React from 'react'
import { IoClose } from 'react-icons/io5'

const Words = ({handleClose, transcription}) => {
    console.log(transcription, "salam")
  return (
    <div className='bg-[#fff] mt-[100px] xl:mt-[10px] h-[580px] w-full py-5 xl:w-[500px] px-5 '>
        <div className='flex justify-end cursor-pointer' onClick={handleClose}>
            <IoClose className='text-lg'/>
        </div>
        <p className='text-[#19373E] font-inter font-medium text-[24px] text-center'>Transcribed Audio</p>
        <div className='mt-3 font-poppins text-base'>
            {transcription}
        </div>
    </div>
  )
}

export default Words