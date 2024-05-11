import React, { useState } from 'react'
import { CiSettings } from 'react-icons/ci'
import { FiUser } from 'react-icons/fi'
import { LuCreditCard, LuShieldAlert } from 'react-icons/lu'
import Profile from './components/Profile'
import Password from './components/Password'
import Billing from './components/Billing'
import Account from './components/Account'

const Settings = () => {
    const [active, setActive] = useState("Profile")

    const handleActive = (value) => {
        setActive(value)
    }

  return (
    <div className='flex gap-[40px] px-[172px] mt-[72px] mb-[79px]'>
        <div className='w-[272px] h-[160px] flex flex-col'>
            <div onClick={() => handleActive("Profile")} className={`${active === "Profile" ? "bg-[#D0D7DE3D] rounded-[6px]" : ""}  flex items-center cursor-pointer p-3 gap-2 hover:bg-[#D0D7DE3D] hover:rounded-[6px]`}>
                <FiUser className='text-base text-[#24292F]' />
                <p className='font-poppins text-[#24292F] font-medium'>Profile</p>
            </div>
            <div onClick={() => handleActive("Password")} className={`${active === "Password" ? "bg-[#D0D7DE3D] rounded-[6px]" : ""}  flex items-center cursor-pointer p-3 gap-2 hover:bg-[#D0D7DE3D] hover:rounded-[6px]`}>
                <LuShieldAlert className='text-base text-[#24292F]' />
                <p className='font-poppins text-[#24292F] text-sm font-medium'>Password and authentication</p>
            </div>
            <div onClick={() => handleActive("Billing")} className={`${active === "Billing" ? "bg-[#D0D7DE3D] rounded-[6px]" : ""}  flex items-center cursor-pointer p-3 gap-2 hover:bg-[#D0D7DE3D] hover:rounded-[6px]`}>
                <LuCreditCard className='text-base text-[#24292F]' />
                <p className='font-poppins text-[#24292F] text-sm font-medium'>Billing and plans</p>
            </div>
            <div onClick={() => handleActive("Account")} className={`${active === "Account" ? "bg-[#D0D7DE3D] rounded-[6px]" : ""}  flex items-center cursor-pointer p-3 gap-2 hover:bg-[#D0D7DE3D] hover:rounded-[6px]`}>
                <CiSettings className='text-base text-[#24292F]' />
                <p className='font-poppins text-[#24292F] text-sm font-medium'>Account</p>
            </div>
        </div>
        <div className='flex flex-col'>
            {active === "Profile" && <Profile />}
            {active === "Password" && <Password />}
            {active === "Billing" && <Billing />}
            {active === "Account" && <Account />}
        </div>
    </div>
  )
}

export default Settings