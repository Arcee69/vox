import React, { useState, useEffect } from 'react'
import Vapi from '@vapi-ai/web';
import { useNavigate } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg';

import Logo from "../assets/svg/logo.svg"
import Close from "../assets/svg/closeIcon.svg"

const MobileNavBar = ({ handleClose}) => {
    const [voxData, setVoxData] = useState([]);
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

  const vapi = new Vapi('5d3d4e5d-3f85-4af4-8dae-9d6527d525fc');

  const start = async () => {
    setCallStatus("loading");
    setLoading(true);
    const response = await vapi.start("1aa24789-cabd-46b4-a5a8-af5a819ac810");
    setLoading(false);
    setVoxData(response)
    console.log(response.status, "brymo")
    return response
  };

  const stop = () => {
    setCallStatus("loading");
    vapi.stop();
  };

  useEffect(() => {
    vapi.on("call-start", () => setCallStatus("active"));
    vapi.on("call-end", () => setCallStatus('inactive'));
    
    return () => vapi.removeAllListeners();
  }, [])
  return (
    <div className="fixed top-0 w-[100%] left-0 h-[100vh] animate__animated  animate__bounceInDown animate__slow" style={{zIndex: 9999}}>
        <div className="bg-[#fff] w-[100%] h-full absolute pl-[29px] pr-[13px] py-[32px] right-0 top-0">
            <div className="flex justify-between items-center">
                <img src={Logo} alt='logo' className='invisible h-[25px]' onClick={() => {navigate("/"); window.scrollTo(0,0); handleClose()}} />
                <img src={Close} alt="close" className="cursor-pointer" onClick={handleClose}/>
            </div>
            <ul class="mt-[32px] flex flex-col gap-y-[24px] pb-[16px]">
                <li onClick={() => {navigate("/"); window.scrollTo(0,0); handleClose()}} className="font-mont  cursor-pointer font-semibold text-[17px]  text-[#00141B]">Home</li>
                <li onClick={() => {navigate("/insight-engine"); window.scrollTo(0,0); handleClose()}} className="font-mont  cursor-pointer font-semibold text-[17px]  text-[#00141B]">Insight Engine</li>
                <li onClick={() => {navigate("/sentiment-decoder"); window.scrollTo(0,0); handleClose()}} className="font-mont  cursor-pointer font-semibold text-[17px]  text-[#00141B]">Sentiment Decoder</li>
            </ul>
            <button type='button' className='bg-[#FF6600] cursor-pointer rounded-lg w-full mt-4 border border-[#000] p-2 flex items-center justify-center h-[67px]' onClick={start}>
              {
                loading ? 
                  <CgSpinner className='animate-spin text-2xl text-[#fff]' /> 
                  : 
                  <p className='text-[#FFF] font-poppins text-[20px] font-medium'>{voxData?.type === "webCall" ? "Conversation Started" : "Try For Free" }</p>
              }
            </button>
        </div>
    </div>
  )
}

export default MobileNavBar