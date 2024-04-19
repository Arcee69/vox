import React from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'

import background from "../assets/png/background.png"
import MiniHeader from './MiniHeader'

const Layout = () => {

  const location  = useLocation()
  return (
    <div
      style={{ background: `url(${location.pathname === "/about" ? "#fff" : background})`, backgroundSize:"cover", backgroundRepeat:"no-repeat" }}
      className='w-full overflow-hidden'
    >
        <div className='w-full hidden xl:block'>
            <Header />
        </div>
        <div className='flex xl:hidden' >
          <MiniHeader />
        </div>
        <div>
            <Outlet />
        </div>
        <div className=''>
            <Footer />
        </div>
    </div>
  )
}

export default Layout