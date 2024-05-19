import React, { useState, useEffect } from 'react'
import Vapi from '@vapi-ai/web';
import { useVoice } from '@humeai/voice-react';
import { CgSpinner } from 'react-icons/cg';

import Monitor from "../../assets/svg/monitor.svg"
import Chart from "../../assets/svg/chart.svg"
import Data from "../../assets/svg/data.svg"
import Reputation from "../../assets/svg/reputation.svg"

import Time from "../../assets/png/time.svg"
import Insights from "../../assets/png/insight.svg"
import Notification from "../../assets/png/notification.svg"
import NotificationB from "../../assets/png/notification-b.svg"

import ModalPop from '../../components/modalPop';
import RequestForm from './RequestForm';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';

import Decoder from "../../assets/png/decoder.jpg"
import { isObjectEmpty } from '../../utils/CheckLoginData';


const InsightEngine = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)

    const { connect } = useVoice()

    const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")))

    console.log(isAuthed, "isAuthed")

    const showModal = () => {
        if(!isAuthed) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 1500)
            connect()
        } else {
            setOpenLogin(true)
        }
    }

    const showOpenSignUpModal = () => {
        setOpenLogin(false)
        setOpenSignUp(true)  
    }
    
  


  return (
    <div className='mt-[100px] xl:mt-[45px] '>
        <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
        <div className='flex flex-col gap-[48px]'>
            <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[38px]'>Insight Engine: Your 24/7 Audio Reputation Advisor</p>

            <div className='flex flex-col gap-2 xl:w-[458px]'>
            <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
            <p className='text-[#17053E] text-[24px]'>We Listen:</p>
            <p className='font-medium text-[#8F899C]'>
                Our advanced AI reputation Management advisor listens to the reputation management challenges 
                you face and provide clear analysis.
            </p>
            </div>

            <div className='flex flex-col gap-4 xl:w-[458px]'>
            <img src={Chart} alt='Monitor' className='w-6 h-6'/>
            <p className='text-[#17053E] text-[24px]'>We Understand: </p>
            <p className='font-medium text-[#8F899C]'>
                Our advanced AI efficiently analyzes spoken language, 
                detecting sentiment, identifying key speakers, and pinpointing emerging trends.
            </p>
            </div>

            <div className='flex flex-col gap-4 xl:w-[458px]'>
                <img src={Data} alt='Monitor' className='w-6 h-6'/>
                <p className='text-[#17053E] text-[24px]'>We Advise: </p>
                <p className='font-medium text-[#8F899C]'>
                    We provide data-driven recommendations to help you craft effective responses, 
                    refine your messaging, and strengthen your brand's reputation.
                </p>
            </div>

            <div className='flex flex-col gap-4 xl:w-[458px]'>
            <img src={Reputation} alt='Monitor' className='w-6 h-6'/>
            <p className='text-[#17053E] text-[24px]'>Make Informed Decisions: </p>
            <p className='font-medium text-[#8F899C]'>
                Leverage on data-driven insights to gain clearer perspective, 
                shape your communication strategies and build a stronger brand.
            </p>
            </div>
           

        </div>
        <div className='flex flex-col mt-10 xl:mt-0 gap-[32px]'>
            <p className='text-[32px] text-[#17053E] w-full text-center xl:text-left xl:w-[613px] font-medium'>VoxPR listens, analyzes and enhances your PR success.</p>
            <button className='xl:w-[371px] mx-auto flex items-center justify-center rounded-lg p-4 bg-[#17053E]' onClick={() => showModal()}>
                <p className='text-[#fff]'>{loading ? <CgSpinner className=" animate-spin text-xl " /> : "Get Insight"} </p>
            </button>
            <img src={Decoder} alt='Decoder' className='xl:w-[600px]'/>
        </div>
        </div>


        <div className='w-full flex flex-col xl:flex-row items-center mb-10 justify-between py-10 xl:py-0 xl:h-[480px] mt-[103px] px-[20px] xl:px-[100px] bg-[#FFF7F2]'>
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
        </div>

        <ModalPop isOpen={open}>
            <RequestForm handleClose={() => setOpen(false)} />
        </ModalPop>

        <ModalPop isOpen={openLogin}>
            <Login handleClose={() => setOpenLogin(false)} showOpenSignUpModal={showOpenSignUpModal}/>
        </ModalPop>

      <ModalPop isOpen={openSignUp}>
        <SignUp handleClose={() => setOpenSignUp(false)}/>
      </ModalPop>

    </div>
  )
}

export default InsightEngine