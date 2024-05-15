import React from 'react'
import Line from "../../../assets/png/line.png"
import { MdArrowOutward } from 'react-icons/md'

const Billing = () => {
  return (
    <div className='flex flex-col gap-[13px]'>
        <p className='font-poppins text-[23px] text-[#24292F]'>Settings</p>
        <hr />
        <div className='bg-[#fff] rounded-lg lg:w-[760px] flex flex-col'>
            <div className='my-6 px-6 flex flex-col gap-6'>
                <div className='flex justify-between'>
                    <div className='flex gap-1 items-center'>
                        <p className='text-[#101828] font-medium text-lg font-inter'>Vox Pro </p>
                        <div className='w-[75px] h-[24px] bg-[#F4DCD380] flex rounded-lg items-center justify-center'>
                            <p className='text-[#FF6600] font-inter font-medium'>Monthly</p>
                        </div>
                    </div>
                    <p className='font-inter text-base lg:text-[48px] font-semibold leading-[60px]'>₦5000<span className='text-[#667085] font-inter font-medium text-sm lg:text-base'>per month</span></p>
                </div>
                <div className='flex flex-col gap-[12px]'>
                    <p className='font-inter text-[#101828] font-medium'>Your subscription</p>
                    <img src={Line} alt="Line" />
                </div>
            </div>
            <hr />
            <div className='flex items-center gap-2 mr-6 py-4 justify-end'>
                <p className='text-[#FF6600] font-inter font-medium'>Renew</p>
                <MdArrowOutward className='text-[#FF6600]'/>
            </div>

        </div>
    </div>
  )
}

export default Billing