import React from 'react'
import Logo from "../assets/svg/logo.svg"
import Close from "../assets/svg/closeIcon.svg"

import { useNavigate } from 'react-router-dom'

const MobileNavBar = ({ handleClose}) => {
    const navigate = useNavigate()
  return (
    <div className="fixed top-0 w-[100%] left-0 h-[100vh] animate__animated  animate__bounceInDown animate__slow" style={{zIndex: 9999}}>
        <div className="bg-[#fff] w-[100%] h-full absolute pl-[29px] pr-[13px] py-[32px] right-0 top-0">
            <div className="flex justify-between items-center">
                <img src={Logo} alt='logo' className='invisible h-[25px]' onClick={() => {navigate("/"); window.scrollTo(0,0); handleClose()}} />
                <img src={Close} alt="close" className="cursor-pointer" onClick={handleClose}/>
            </div>
            <ul class="mt-[32px] flex flex-col gap-y-[24px] pb-[16px]">
                <li onClick={() => {navigate("/"); window.scrollTo(0,0); handleClose()}} className="font-mont  cursor-pointer font-semibold text-[17px]  text-[#00141B]">Home</li>
                <li onClick={() => {navigate("/about"); window.scrollTo(0,0); handleClose()}} className="font-mont  cursor-pointer font-semibold text-[17px]  text-[#00141B]">About us</li>
            </ul>
        </div>
    </div>
  )
}

export default MobileNavBar