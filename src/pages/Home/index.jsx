import React, { useState, useEffect } from 'react'
import Vapi from '@vapi-ai/web';
import { useNavigate } from 'react-router-dom';
import { CgSpinner } from 'react-icons/cg';
import { useVoice } from '@humeai/voice-react';

import { isObjectEmpty } from '../../utils/CheckLoginData';

import Globe from "../../assets/svg/globe.svg"
import Cone from "../../assets/svg/cone.svg"
import ModalPop from '../../components/modalPop';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';

const Home = () => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [loading, setLoading] = useState(false)

  // const [callStatus, setCallStatus] = useState("inactive");
  // const [voxData, setVoxData] = useState([]);
  // const [loading, setLoading] = useState(false)

  // const navigate = useNavigate()

  // const vapi = new Vapi('5d3d4e5d-3f85-4af4-8dae-9d6527d525fc');

  // const start = async () => {
  //   setCallStatus("loading");
  //   setLoading(true);
  //   const response = await vapi.start("1aa24789-cabd-46b4-a5a8-af5a819ac810");
  //   setLoading(false);
  //   setVoxData(response)
  //   console.log(response.status, "brymo")
  //   return response
  // };

  // const stop = () => {
  //   setCallStatus("loading");
  //   vapi.stop();
  // };

  // useEffect(() => {
  //   vapi.on("call-start", () => setCallStatus("active"));
  //   vapi.on("call-end", () => setCallStatus('inactive'));
    
  //   return () => vapi.removeAllListeners();
  // }, [])

  const { connect } = useVoice();

  const navigate = useNavigate()

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

  const showSecondModal = () => {
    if(!isAuthed) {
      navigate("/sentiment-decoder")
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
      <div className='w-full pb-[120px] flex justify-center items-center relative'>
        <div className='absolute hidden xl:block -top-10 left-14'>
          <img src={Cone} alt='Cone' />
        </div>
        <div className='w-[300px] md:w-[500px] xl:w-[844px] mt-24 xl:mt-10 flex flex-col gap-6 items-center justify-center'>
          <p className='text-[#404040] text-center font-medium font-poppins text-[20px]'>VoxPR: Your AI-Powered PR Partner</p>
          <p className='font-poppins text-[48px] text-center text-[#17053E]'>Control Your Brand's<span className='font-semibold text-[#FF6600]'> Narrative.</span></p>
          <p className='text-[#17053E] text-center font-poppins'>
            Our Insight Engine reveals what's being said. Our Sentiment Decoder uncovers how people feel.
          </p>
          <div className='flex flex-col xl:flex-row gap-5 items-center'>
            <button type='button' className='bg-[#FF6600] cursor-pointer rounded-3xl w-[300px] xl:w-[371px] p-2 flex items-center justify-center h-[67px]' onClick={() => showModal()}>
              <p className='text-[#FFF] font-poppins text-[20px] font-medium'>{loading ? <CgSpinner className=" animate-spin text-xl " /> : "Start Insight Engine"} </p>
            </button>
            <button type='button' className='bg-[#17053E] xl:z-10 cursor-pointer rounded-3xl w-[300px] xl:w-[371px] p-2 flex items-center justify-center h-[67px]' onClick={() => showSecondModal()}>
              <p className='text-[#FFF] font-poppins text-[20px] font-medium'>Use Sentiment Decoder</p>
            </button>
          </div>
         
        </div>
        <div className='absolute hidden xl:block -bottom-6 right-14'>
          <img src={Globe} alt='Globe' />
        </div>
      </div>

      <ModalPop isOpen={openLogin}>
        <Login handleClose={() => setOpenLogin(false)} showOpenSignUpModal={showOpenSignUpModal}/>
      </ModalPop>

      <ModalPop isOpen={openSignUp}>
        <SignUp handleClose={() => setOpenSignUp(false)}/>
      </ModalPop>

    </div>
  )
}

export default Home