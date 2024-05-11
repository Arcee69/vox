import React from 'react'

const Password = () => {
  return (
    <div className='flex flex-col gap-[13px]'>
        <p className='font-poppins text-[23px] text-[#24292F]'>Settings</p>
        <hr />
        <div className='flex flex-col gap-[8px]'>
            <label htmlFor='Current Password' className='text-[#24292F] font-semibold text-sm'>Current Password</label>
            <input 
                className='w-[440px] h-[48px] p-2 rounded-lg bg-[#D8DEE4] outline-none text-[#000]'
                placeholder='******'
                name='currentPassword'
                type='password'
                disabled
            />
        </div>
        <hr />
        <div className='flex flex-col gap-[8px]'>
            <label htmlFor='New Password' className='text-[#24292F] font-semibold text-sm text-[#000]'>New Password</label>
            <input 
                className='w-[440px] h-[48px] p-2 rounded-lg bg-[#D8DEE4] outline-none'
                placeholder='******'
                name='newPassword'
                type='text'
                disabled
            />
        </div>
        <hr />
        <div className='flex flex-col gap-[8px]'>
            <label htmlFor='Confirm Password' className='text-[#24292F] font-semibold text-sm text-[#000]'>Confirm Password</label>
            <input 
                className='w-[440px] h-[48px] p-2 rounded-lg bg-[#D8DEE4] outline-none'
                placeholder='******'
                name='confirmPassword'
                type='text'
                disabled
            />
        </div>

        {/* <button
            type='button'
            className='bg-[#FF6600] rounded-[30px] w-[162px] h-[56px] '
        >
            <p className='text-[#fff] text-[20px] font-medium'>Update</p>
        </button> */}

    </div>
  )
}

export default Password