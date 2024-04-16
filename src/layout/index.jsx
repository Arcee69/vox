import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='w-full overflow-hidden'>
        <div className='w-full relative z-50'>
            <Header />
        </div>
        <div>
            <Outlet />
        </div>
        <div className='relative mt-[40rem]'>
            <Footer />
        </div>
    </div>
  )
}

export default Layout