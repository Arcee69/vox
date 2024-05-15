import React from 'react'

const Profile = () => {

    const userData = JSON.parse(localStorage.getItem("userObj"))
    console.log(userData, "userData")
  


  return (
    <div className='flex flex-col gap-[13px]'>
        <p className='font-poppins text-[23px] text-[#24292F]'>Settings</p>
        <hr />
        <div className='flex flex-col gap-[8px]'>
            <label htmlFor='Name' className='text-[#24292F] font-semibold text-sm'>Name</label>
            <input 
                className='lg:w-[440px] h-[48px] p-2 rounded-lg bg-[#D8DEE4] outline-none text-[#000]'
                placeholder={userData?.data?.name}
                name='user'
                type='text'
                disabled
            />
        </div>
        <hr />
        <div className='flex flex-col gap-[8px]'>
            <label htmlFor='Email' className='text-[#24292F] font-semibold text-sm text-[#000]'>Email</label>
            <input 
                className='lg:w-[440px] h-[48px] p-2 rounded-lg bg-[#D8DEE4] outline-none'
                placeholder={userData?.data?.email}
                name='email'
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

export default Profile