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
      navigate("/vox-speaks"); 
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
      navigate("/vox-sentiment"); 
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
      navigate("/voxover"); 
      window.scrollTo(0, 0)
    } else {
      setOpenLogin(true)
    }
  }

  const showSixthModal = () => {
    if(!isAuthed) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1500)
      navigate("/vox-shield"); 
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
            <div className='absolute hidden xl:block top-10 right-14'>
                <img src={Globe} alt='Globe' />
            </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-[28px] mx-[20px] lg:mx-[64px] items-center'>
            <div className='w-full lg:w-[388px] h-full p-[28px] flex flex-col gap-6 z-10 bg-[#F9F8F8] rounded-lg border cursor-pointer border-[#E0E6ED]' onClick={() => showModal()}>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Vox Speaks</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Your AI Reputation Strategist</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>
                  Gain expert guidance on safeguarding and enhancing your brand's reputation. 
                  VoxPR's Insights Engine Engine aggregates and analyzes vast amounts of media data, 
                  delivering actionable intelligence to help you build and protect your brand's reputation.
                </p>
            </div>
            <div className='w-full lg:w-[388px] h-full p-[28px] flex flex-col gap-6 bg-[#F9F8F8] rounded-lg border cursor-pointer border-[#E0E6ED]' onClick={() => showSecondModal()}>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Vox Sentiment</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Sentiment Analysis Tool</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>
                  Our advanced AI tool analyzes and trascribes both audio and text to reveal sentiment, 
                  key topics, intent, and streamline transcription.
                </p>
            </div>
            <div className='w-full lg:w-[388px] h-full p-[38px] flex flex-col z-10 gap-6 bg-[#F9F8F8] rounded-lg border border-[#E0E6ED]' onClick={() => showFourthModal()}>
              <div className='flex justify-between'>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
              </div>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Vox Release</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Press Release Automation</p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>
                  Utilizes AI to analyze transcribed content and automatically 
                  generate well-crafted press releases, reducing manual effort and increasing efficiency.
                </p>
            </div>
            <div className='w-full lg:w-[388px] h-full p-[28px] flex flex-col gap-6 z-50 bg-[#F9F8F8] rounded-lg cursor-pointer border border-[#E0E6ED]'  onClick={() => showThirdModal()}>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Vox Scribe</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>Live Recording Capability</p>
                <p  className='text-[#3B3F5C] font-poppins opacity-80 text-base'>
                  Enables users to record interviews and events directly within the application, 
                  streamlining the process of capturing essential communications. 
                  Offers real-time transcription of audio streams, ensuring immediate access to accurate textual 
                  representations of all communications.
                </p>
            </div>
            <div className='w-full lg:w-[388px] h-full p-[38px] flex flex-col gap-6 bg-[#F9F8F8] rounded-lg border border-[#E0E6ED]' onClick={() => showFifthModal()}>
              <div className='flex justify-between'>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
              </div>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Vox Over</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50'>
                  Your Ultimate Voice Over Tool for Impactful Storytelling
                </p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>
                  Let VoxOver take your brand’s communication to new heights. With our feature, your messages aren’t 
                  just heard—they’re remembered. Add the power of voice to your content today.
                </p>
            </div>
            <div className='w-full lg:w-[388px] h-full p-[38px] flex flex-col gap-6 bg-[#F9F8F8] rounded-lg border border-[#E0E6ED]' onClick={() => showSixthModal()}>
              <div className='flex justify-between'>
                <img src={Logo} alt='Logo' className='w-[60px] h-[60px]'/>
                <p className='font-poppins text-base text-[#3B3F5C]'>Beta</p>
              </div>
                <p className='text-[32px] font-poppins font-bold text-[#3B3F5C]'>Vox Shield</p>
                <p className='text-[#3B3F5C] font-poppins text-base opacity-50 '>
                  Your AI-Powered Truth Detector
                </p>
                <p className='text-[#3B3F5C] font-poppins opacity-80 text-base'>
                  Leverage AI to detect deepfakes, expose fake news, analyze sentiment, 
                  and track media performance—ensuring accurate, reliable insights at every turn.
                </p>
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