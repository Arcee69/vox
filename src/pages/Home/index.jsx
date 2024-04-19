import React, { useState, useEffect } from 'react'
import Vapi from '@vapi-ai/web';


import Globe from "../../assets/svg/globe.svg"
import Cone from "../../assets/svg/cone.svg"

const Home = () => {
  const [callStatus, setCallStatus] = useState("inactive");
  const [voxData, setVoxData] = useState([])

  const vapi = new Vapi('5d3d4e5d-3f85-4af4-8dae-9d6527d525fc');

  const start = async () => {
    setCallStatus("loading");
    const response = await vapi.start("1aa24789-cabd-46b4-a5a8-af5a819ac810");
    setVoxData(response)
    console.log(response, "brymo")
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
    <div className='w-full'>
      <div className='w-full pb-[120px] flex justify-center items-center relative'>
        <div className='absolute hidden xl:block -top-10 left-14'>
          <img src={Cone} alt='Cone' />
        </div>
        <div className='w-[300px] md:w-[500px] xl:w-[844px] mt-24 xl:mt-10 flex flex-col gap-6 items-center justify-center'>
          <p className='text-[#404040] text-center font-medium font-poppins text-[20px]'>VoxPR: Your AI-Powered PR Partner</p>
          <p className='font-poppins text-[48px] text-center text-[#17053E]'>Smarter PR starts <span className='font-semibold text-[#FF6600]'>Here</span></p>
          <p className='text-[#17053E] text-center font-poppins'>
            VoxPR reimagines the way PR professionals work. 
            Our cutting edge audio intelligence technology gives you real-time 
            insughts and comprehensive media analysis you wont find elsewhere.
          </p>
          <button type='button' className='bg-[#FF6600] cursor-pointer rounded-3xl w-[300px] xl:w-[371px] p-2 flex items-center justify-center h-[67px]' onClick={start}>
            <p className='text-[#FFF] font-poppins text-[20px] font-medium'>{voxData?.type === "webCall" ? "Conversation Started" : "Start Conversation"}</p>
          </button>
         
        </div>
        <div className='absolute hidden xl:block -bottom-6 right-14'>
          <img src={Globe} alt='Globe' />
        </div>
      </div>


    </div>
  )
}

export default Home