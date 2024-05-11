import React from 'react'

const Account = () => {
  return (
    <div className='flex flex-col gap-[13px]'>
        <p className='font-poppins text-[23px] text-[#24292F]'>Settings</p>
        <hr />
        <div className='flex flex-col gap-[19px] mt-[28px] mb-[37px]'>
            <p className='font-inter font-semibold text-[#24292F]'>Delete Account</p>
            <button
                type='button'
                className='bg-[#FF6600] rounded-[30px] w-[235px] p-2 h-[56px] '
            >
                <p className='text-[#fff] text-[20px] font-medium'>Delete Account</p>
            </button>
        </div>
        <hr />
    </div>
  )
}

export default Account