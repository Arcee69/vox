import React, { useState,  } from 'react'
import { useNavigate } from 'react-router-dom'

import { isObjectEmpty } from '../../utils/CheckLoginData'

import Globe from "../../assets/svg/globe.svg"
import Cone from "../../assets/svg/cone.svg"
import Logo from "../../assets/png/khan.png"

import ModalPop from '../../components/modalPop'
import Login from '../Auth/Login'
import SignUp from '../Auth/SignUp'



const Solutions = () => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
 
  const navigate = useNavigate()

  const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")))

  console.log(isAuthed, "isAuthed")

  const showModal = () => {
    if(!isAuthed) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1500)
      navigate("/insight-engine"); 
      window.scrollTo(0, 0)
    } else {
      setOpenLogin(true)
    }
  }

  const showSecondModal = () => {
    if(!isAuthed) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1500)
      navigate("/sentiment-decoder"); 
      window.scrollTo(0, 0)
    } else {
      setOpenLogin(true)
    }
  }

  const showThirdModal = () => {
    if(!isAuthed) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1500)
      navigate("/voxscribe"); 
      window.scrollTo(0, 0)
    } else {
      setOpenLogin(true)
    }
  }

  const showFourthModal = () => {
    if(!isAuthed) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1500)
      navigate("/voxrelease"); 
      window.scrollTo(0, 0)
    } else {
      setOpenLogin(true)
    }
  }

  const showFifthModal = () => {
    if(!isAuthed) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1500)
      navigate("/voxtranslate"); 
      window.scrollTo(0, 0)
    } else {
      setOpenLogin(true)
    }
  }

  const showOpenSignUpModal = () => {
    setOpenLogin(false)
    setOpenSignUp(true)  
}



  return (
    <div className='w-full'>
        <div className='w-full pb-[20px] flex justify-center items-center relative'>
            <div className='absolute hidden xl:block top-10 left-14'>
                <img src={Cone} alt='Cone' />
            </div>
            <div className='w-[300px] md:w-[500px] xl:w-[844px] mt-24 xl:mt-2 flex flex-col gap-4 items-center justify-center'>
                <p className='text-[#404040] w-[400px] text-center font-medium font-poppins text-[20px]'>Intelligent AI Solutions to Streamline PR and Communication Workflow</p>
                <p className='font-poppins text-[48px] text-center text-[#17053E]'>Vox PR<span className='font-semibold text-[#FF6600]'> Tools.</span></p>
            </div>
            <div className='absolute hidden xl:block  top-10 right-14'>
                <img src={Globe} alt='Globe' />
            </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-[28px] mx-[20px] lg:mx-[64px] items-center'>
            <div className='w-full lg:w-[388px] h-full p-[28px] flex flex-col gap-6 z-50 bg-[#F9F8F8] rounded-lg border cursor-pointer border-[#E0E6ED]' onClick={() => showModal()}>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Insight Engine</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Your 24/7 Audio Reputation Advisor</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>Never miss a mention. VoxPR tracks conversations across traditional and social media delivering instant alerts on what matters to you.</p>
            </div>
            <div className='w-full lg:w-[388px] h-full p-[28px] flex flex-col gap-6 bg-[#F9F8F8] rounded-lg border cursor-pointer border-[#E0E6ED]' onClick={() => showSecondModal()}>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Sentiment Decoder</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Sentiment Analysis Tool</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>Uncover hidden meanings in both audio and text to inform your strategies</p>
            </div>
            <div className='w-full lg:w-[388px] h-full p-[28px] flex flex-col gap-6 z-50 bg-[#F9F8F8] rounded-lg cursor-pointer border border-[#E0E6ED]'  onClick={() => showThirdModal()}>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Voxscribe</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Live Transcription and Press Release Automation Tool</p>
                <p  className='text-[#3B3F5C] font-poppins opacity-80 text-base'>
                  Tired of tedious manual transcription and struggling to craft impactful press releases? 
                  VoxScribe is your one-stop solution for turning spoken words into valuable content, instantly. 
                  It offers a near-zero-percent error rate.
                </p>
            </div>
            <div className='w-full lg:w-[388px] h-full p-[38px] flex flex-col gap-6 bg-[#F9F8F8] rounded-lg border border-[#E0E6ED]' onClick={() => showFourthModal()}>
              <div className='flex justify-between'>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                {/* <p className='font-poppins text-base text-[#3B3F5C]'>Coming Soon</p> */}
              </div>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Vox Release</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Press Release Automation tool</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at enim a arcu bibendum posuere ut eget elit. Etiam vitae ipsum</p>
            </div>
            <div className='w-full lg:w-[388px] h-full p-[38px] flex flex-col gap-6 bg-[#F9F8F8] rounded-lg border border-[#E0E6ED]' onClick={() => showFifthModal()}>
              <div className='flex justify-between'>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
              </div>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Vox Translate</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Dynamic Voice Translation</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at enim a arcu bibendum posuere ut eget elit. Etiam vitae ipsum</p>
            </div>
            <div className='w-full lg:w-[388px] h-full p-[38px] flex flex-col gap-6 bg-[#F9F8F8] rounded-lg border border-[#E0E6ED]'>
              <div className='flex justify-between'>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='font-poppins text-base text-[#3B3F5C]'>Coming Soon</p>
              </div>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Spincheck</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50 lg:whitespace-nowrap'>Deepfake and Fake News Detection Tool</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at enim a arcu bibendum posuere ut eget elit. Etiam vitae ipsum</p>
            </div>

        </div>

        <ModalPop isOpen={openLogin}>
          <Login handleClose={() => setOpenLogin(false)} showOpenSignUpModal={showOpenSignUpModal} />
        </ModalPop>

        <ModalPop isOpen={openSignUp}>
          <SignUp handleClose={() => setOpenSignUp(false)} />
        </ModalPop>

    </div>
  )
}

export default Solutions