import React, { useState, useEffect } from 'react'
import Vapi from '@vapi-ai/web';

import Monitor from "../../assets/svg/monitor.svg"
import Chart from "../../assets/svg/chart.svg"
import Data from "../../assets/svg/data.svg"
import Reputation from "../../assets/svg/reputation.svg"

import Chat from "../../assets/png/chat.png"
import Analytics from "../../assets/png/analytics.png"
import DataB from "../../assets/png/data.png"
import Computer from "../../assets/png/computer.png"

import Time from "../../assets/png/time.svg"
import Insights from "../../assets/png/insight.svg"
import Notification from "../../assets/png/notification.svg"
import NotificationB from "../../assets/png/notification-b.svg"
import ModalPop from '../../components/modalPop'
import RequestForm from './RequestForm'


const InsightEngine = () => {
    const [open, setOpen] = useState(false);
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
    <div className='mt-[100px] xl:mt-[45px] '>
        <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
        <div className='flex flex-col gap-[48px]'>
            <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[38px]'>Why Choose VoxPR Insight Engine?</p>

            <div className='flex flex-col gap-4 xl:w-[458px]'>
            <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
            <p className='text-[#17053E] text-[24px]'>Proactive Monitoring</p>
            <p className='font-medium text-[#8F899C]'>
                Never miss a mention. VoxPR tracks conversations across traditional and social media 
                delivering instant alerts on what matters to you.
            </p>
            </div>

            <div className='flex flex-col gap-4 xl:w-[458px]'>
            <img src={Chart} alt='Monitor' className='w-6 h-6'/>
            <p className='text-[#17053E] text-[24px]'>Insightful Sentimental Analysis</p>
            <p className='font-medium text-[#8F899C]'>
                Uncover the true tone of coverage. 
                Know how your brand is perceived and track sentiment trend over time.
            </p>
            </div>

            <div className='flex flex-col gap-4 xl:w-[458px]'>
            <img src={Data} alt='Monitor' className='w-6 h-6'/>
            <p className='text-[#17053E] text-[24px]'>Data Driven Reccomendations</p>
            <p className='font-medium text-[#8F899C]'>
                Uncover the true tone of coverage. 
                Know how your brand is perceived and track sentiment trend over time.
            </p>
            </div>

            <div className='flex flex-col gap-4 xl:w-[458px]'>
            <img src={Reputation} alt='Monitor' className='w-6 h-6'/>
            <p className='text-[#17053E] text-[24px]'>Reputation Management</p>
            <p className='font-medium text-[#8F899C]'>
                Stay ahead of potential crisis .nVoxPR helps you identify and respond to emerging narrative with agility.
            </p>
            </div>

            <button className='xl:w-[371px] rounded-lg p-4 bg-[#17053E]' onClick={start}>
                <p className='text-[#fff]'>{voxData?.type === "webCall" ? "Conversation Started" : "Experience the VoxPR Advantage"} </p>
            </button>
           

        </div>
        <div className='flex flex-col mt-10 xl:mt-0 gap-[32px]'>
            <p className='text-[32px] text-[#17053E] w-full text-center xl:text-left xl:w-[613px] font-medium'>VoxPR listens, analyzes and enhances your PR success.</p>
            <img src={Computer} alt='computer' className='xl:w-[600px]'/>
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
    </div>
  )
}

export default InsightEngine