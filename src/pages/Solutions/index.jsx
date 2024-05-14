import React, { useState,  } from 'react'
import { useNavigate } from 'react-router-dom'

import Globe from "../../assets/svg/globe.svg"
import Cone from "../../assets/svg/cone.svg"
import Logo from "../../assets/png/khan.png"


const Solutions = () => {
 
  const navigate = useNavigate()



  return (
    <div className='w-full'>
        <div className='w-full pb-[120px] flex justify-center items-center relative'>
            <div className='absolute hidden xl:block -top-10 left-14'>
                <img src={Cone} alt='Cone' />
            </div>
            <div className='w-[300px] md:w-[500px] xl:w-[844px] mt-24 xl:mt-10 flex flex-col gap-6 items-center justify-center'>
                <p className='text-[#404040] text-center font-medium font-poppins text-[20px]'>Our solutions</p>
                <p className='font-poppins text-[48px] text-center text-[#17053E]'>Vox PR<span className='font-semibold text-[#FF6600]'> Tools.</span></p>
            </div>
            <div className='absolute hidden xl:block  -bottom-6 right-14'>
                <img src={Globe} alt='Globe' />
            </div>
        </div>
        <div className='grid grid-cols-3 gap-[28px] mx-[64px] items-center'>
            <div className='w-[388px] p-[28px] flex flex-col gap-6 bg-[#F9F8F8] rounded-lg border cursor-pointer border-[#E0E6ED]' onClick={() => {navigate("/insight-engine"); window.scrollTo(0, 0)}}>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Insight Engine</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Recording Module</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>Never miss a mention. VoxPR tracks conversations across traditional and social media delivering instant alerts on what matters to you.</p>
            </div>
            <div className='w-[388px] p-[28px] flex flex-col gap-6 bg-[#F9F8F8] rounded-lg border cursor-pointer border-[#E0E6ED]' onClick={() => {navigate("/sentiment-decoder"); window.scrollTo(0, 0)}}>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Sentiment Decoder</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Sentiment Analysis Tool</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>Our advanced AI tool analyzes and trascribes both audio and text to reveal sentiment, key topics, intent, and streamline transcription.</p>
            </div>
            <div className='w-[388px] p-[28px] flex flex-col gap-6 z-50 bg-[#F9F8F8] rounded-lg cursor-pointer border border-[#E0E6ED]'  onClick={() => {navigate("/voxscribe"); window.scrollTo(0, 0)}}>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Voxscribe</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Live Transcription tool</p>
                <p  className='text-[#3B3F5C] font-poppins opacity-80 text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at enim a arcu bibendum posuere ut eget elit. Etiam vitae ipsum</p>
            </div>
            <div className='w-[388px] p-[38px] flex flex-col gap-6 bg-[#F9F8F8] rounded-lg border border-[#E0E6ED]'>
              <div className='flex justify-between'>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='font-poppins text-base text-[#3B3F5C]'>Coming Soon</p>
              </div>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Vox Release</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Press Release Automation tool</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at enim a arcu bibendum posuere ut eget elit. Etiam vitae ipsum</p>
            </div>
            <div className='w-[388px] p-[38px] flex flex-col gap-6 bg-[#F9F8F8] rounded-lg border border-[#E0E6ED]'>
              <div className='flex justify-between'>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='font-poppins text-base text-[#3B3F5C]'>Coming Soon</p>
              </div>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Spincheck</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50 whitespace-nowrap'>Deepfake and Fake News Detection Tool</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at enim a arcu bibendum posuere ut eget elit. Etiam vitae ipsum</p>
            </div>

        </div>
    </div>
  )
}

export default Solutions