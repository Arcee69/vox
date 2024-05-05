import React from 'react'

import Decoder from "../../assets/png/decoder.jpg"

const Pricing = () => {
  return (
    <div className='mt-[100px] xl:mt-[45px] '>
    <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
        <div className='flex flex-col gap-[48px]'>
            <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[38px]'>Pricing</p>

    

            <div className='flex flex-col gap-4 xl:w-[458px]'>
        
            </div>

            <div className='flex flex-col gap-4 xl:w-[458px]'>
        
            </div>

            <div className='flex flex-col gap-4 xl:w-[458px]'>
        
            </div>

            <div className='flex flex-col gap-4 xl:w-[458px]'>
        
            </div>

            {/* <button className='xl:w-[371px] rounded-lg p-4 bg-[#17053E]'>
                <p className='text-[#fff]'>Make Payment </p>
            </button> */}
        

        </div>
        <div className='flex flex-col mt-10 xl:mt-0 gap-[32px]'>
            <p className='text-[32px] text-[#17053E] w-full text-center xl:text-left xl:w-[613px] font-medium'>VoxPR listens, analyzes and enhances your PR success.</p>
            <img src={Decoder} alt='Decoder' className='xl:w-[600px]'/>
        </div>
    </div>


    {/* <div className='w-full flex flex-col xl:flex-row items-center mb-10 justify-between py-10 xl:py-0 xl:h-[480px] mt-[103px] px-[20px] xl:px-[100px] bg-[#FFF7F2]'>
        <div className='flex flex-col gap-[6px]'>
            <p className='text-2xl xl:text-[30px] text-[#17053E] font-medium xl:w-[673px]'>
                Our AI driven product helps you to stay ahead of your public 
                image by monitoring trends and helping you control your media narrative.
            </p>
            <button type='button' className='xl:w-[371px] rounded-lg bg-[#17053E] p-4' onClick={() => setOpen(true)}>
                <p className='text-[#fff]'>Request Free Consultation</p>
            </button>
        </div>
        <div className='flex-col relative hidden xl:flex'>
            <img src={Time} alt='Time' className='w-[208px]  absolute -top-24 '/>
            <img src={Notification} alt='Notification' className='w-[444px] left-14 -top-16 absolute ' />
            <img src={Insights} alt='Insights' className='w-[193px]  top-20 z-40 absolute'/>
            <img src={NotificationB} alt='NotificationB' className='w-[446px] left-14 top-20 relative  ' />
        </div>
    </div> */}

  
    </div>
  )
}

export default Pricing