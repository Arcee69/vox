import React, { useState } from 'react'

import Hamburger from "../assets/png/hamburger.png"
import Logo from "../assets/svg/logo.svg"
import MobileNavBar from './MobileNavBar'
import { useLocation, useNavigate } from 'react-router-dom'

const MiniHeader = () => {
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className='w-full fixed z-10'>
        <div  className={`${location.pathname === "/sentiment-decoder" || location.pathname === "/insight-engine" ? "bg-[#fff]" : "bg-transparent"} w-full mx-auto h-[58px]  py-[16px] px-[14px]  flex justify-between items-center`}>
            <img src={Logo} alt='logo' className=' h-[50px]' onClick={() => navigate("/")} />
            <img src={Hamburger} alt='logo'  className='w-[21px] h-[16px]' onClick={() => setOpen(true)}/>
        </div>
        {open && <MobileNavBar handleClose={() => setOpen(false)} /> }
    </div>
  )
}

export default MiniHeader