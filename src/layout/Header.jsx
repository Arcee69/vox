import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Vapi from '@vapi-ai/web';

import Logo from "../assets/svg/logo.svg"
import { CgSpinner } from 'react-icons/cg';

const Header = () => {
  const [callStatus, setCallStatus] = useState('inactive')
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
    <div 
      className='w-full h-[120px] py-[26px] px-[100px] flex items-center justify-between' 
    >
        <img src={Logo} alt='logo' onClick={() => navigate("/")} className='cursor-pointer'/>
        <div className='flex items-center gap-[48px]'>
            <p className='text-BLACK-_100 cursor-pointer font-poppins' onClick={() => navigate("/")}>Home</p>
            <p className='text-BLACK-_100 cursor-pointer  font-poppins' onClick={() => navigate("/insight-engine")}>Insight Engine</p>
            <p className='text-BLACK-_100 cursor-pointer  font-poppins' onClick={() => navigate("/sentiment-decoder")}> Sentiment Decoder</p>
            <button type='button' className='bg-[#FF6600] cursor-pointer rounded-3xl w-[200px]  p-2 flex items-center justify-center h-[54px]' onClick={start}>
              {
                loading ? 
                  <CgSpinner className='animate-spin text-2xl text-[#fff]' /> 
                  : 
                  <p className='text-[#FFF] font-poppins text-[20px] font-medium'>{voxData?.type === "webCall" ? "Speak" : "Try For Free" }</p>
              }
            </button>
        </div>
        
    </div>
  )
}

export default Header