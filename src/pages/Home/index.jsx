import React from 'react'

import Monitor from "../../assets/svg/monitor.svg"
import Chart from "../../assets/svg/chart.svg"
import Data from "../../assets/svg/data.svg"
import Reputation from "../../assets/svg/reputation.svg"

import Background from "../../assets/png/background.png"
import Computer from "../../assets/png/computer.png"
import Speaker from "../../assets/png/speaker.png"
import Idea from "../../assets/png/idea.png"
import Brain from "../../assets/png/brain-b.png"

import Chat from "../../assets/png/chat.png"
import Analytics from "../../assets/png/analytics.png"
import DataB from "../../assets/png/data.png"

import Time from "../../assets/png/time.svg"
import Insights from "../../assets/png/insight.svg"
import Notification from "../../assets/png/notification.svg"
import NotificationB from "../../assets/png/notification-b.svg"

const Home = () => {
  return (
    <div className='w-full'>
      <div 
        style={{backgroundImage: `url(${Background})`, backgroundSize:"cover", backgroundRepeat: "no-repeat"}}
        className='w-full h-[650px] pt-[185px] pb-[120px] -z-10 flex justify-center absolute top-0'
      >
        <div className='w-[844px]   flex flex-col gap-6 items-center justify-center'>
          <p className='text-WHITE-_100 text-center font-semibold font-poppins text-[38px]'>Your AI Powered <span style={{ background: "radial-gradient(#E8562E, #F9E4DF)", WebkitBackgroundClip:"text", WebkitTextFillColor: "transparent" }}>PR Partner.</span> <br /> Upgrade Your PR Strategy with Audio Intelligence</p>
          <p className='text-WHITE-_100 text-center font-poppins'>
            VoxPR reimagines the way PR professionals work. 
            Our cutting edge audio intelligence technology gives you real-time 
            insughts and comprehensive media analysis you wont find elsewhere.
          </p>
          <button className='bg-[#fff] rounded-lg w-[371px] p-2 flex items-center justify-center h-[67px]'>
            <p className='text-[#FF6600] font-poppins text-[20px] font-medium'>Experience the VoxPR Advantage</p>
          </button>
        </div>
      </div>

      <div className='mt-[45px] relative top-[35rem]'>
        <div className='flex justify-between px-[100px]'>
          <div className='flex flex-col gap-[48px]'>
            <p className='w-[322px] text-[#17053E] text-[38px]'>Why Choose VoxPR?</p>

            <div className='flex flex-col gap-4 w-[458px]'>
              <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
              <p className='text-[#17053E] text-[24px]'>Proactive Monitoring</p>
              <p className='font-medium text-[#8F899C]'>
                Never miss a mention. VoxPR tracks conversations across traditional and social media 
                delivering instant alerts on what matters to you.
              </p>
            </div>

            <div className='flex flex-col gap-4 w-[458px]'>
              <img src={Chart} alt='Monitor' className='w-6 h-6'/>
              <p className='text-[#17053E] text-[24px]'>Insightful Sentimental Analysis</p>
              <p className='font-medium text-[#8F899C]'>
                Uncover the true tone of coverage. 
                Know how your brand is perceived and track sentiment trend over time.
              </p>
            </div>

            <div className='flex flex-col gap-4 w-[458px]'>
              <img src={Data} alt='Monitor' className='w-6 h-6'/>
              <p className='text-[#17053E] text-[24px]'>Data Driven Reccomendations</p>
              <p className='font-medium text-[#8F899C]'>
                Uncover the true tone of coverage. 
                Know how your brand is perceived and track sentiment trend over time.
              </p>
            </div>

            <div className='flex flex-col gap-4 w-[458px]'>
              <img src={Reputation} alt='Monitor' className='w-6 h-6'/>
              <p className='text-[#17053E] text-[24px]'>Reputation Management</p>
              <p className='font-medium text-[#8F899C]'>
                Stay ahead of potential crisis .nVoxPR helps you identify and respond to emerging narrative with agility.
              </p>
            </div>

            <button type='button' className='w-[371px] rounded-lg bg-[#FF6600] p-4'>
              <p className='text-[#fff]'>Request Free Consultation</p>
            </button>

          </div>
          <div className='flex flex-col gap-[32px]'>
            <p className='text-[32px] text-[#17053E] w-[613px] font-medium'>VoxPR listens, analyzes and enhances your PR success.</p>
            <img src={Computer} alt='computer' className='w-[600px]'/>
          </div>
        </div>

        <div className='w-full flex items-center justify-between h-[480px] mt-[103px] px-[100px] bg-[#17053E]'>
          <div className='flex flex-col gap-[6px]'>
              <p className='text-[30px] text-[#fff] font-medium w-[583px]'>Get an experience of how VoxPR helps your PR success.</p>
              <p className='text-[20px] text-[#8F899C] w-[466px]'>Request for a free consultation to get familiar with the VoxPR advantage.</p>
              <button className='w-[371px] rounded-lg p-4 bg-[#FF6600]'>
                <p className='text-[#fff]'>Experience the VoxPR Advantage</p>
              </button>
          </div>
          <div className='flex flex-col relative'>
            <img src={Idea} alt='Idea' className='w-[64px] h-[64px] absolute top-10 left-28'/>
            <img src={Brain} alt='Brain' />
            <img src={Speaker} alt='Speaker' className='w-[64px] h-[64px] absolute right-0 bottom-2'/>
          </div>
        </div>

        <iframe width="100%" className='mt-10' height="1600" src="https://rss.app/embed/v1/wall/twxQdpyxGOCGmusq" frameborder="0"></iframe>
        
        <div className='mt-[120px] w-[1205px] m-auto'>
          <p className='text-[40px] font-semibold font-poppins text-[#17053E]'>About VoxPR</p>
          <div className='mt-[74px] flex flex-col gap-[48px]'>
            <div className='flex items-center gap-[48px] w-full'>
              <img src={Chat} alt='chat' className='w-[400px] h-[225px]' />
              <div className='flex flex-col'>
                <p className='text-[#17053E] font-medium text-[32px] font-poppins'>Your Savvy <span className='text-[#FF6600]'>PR Assistant</span></p>
                <p className='text-[#17053E] text-[20px] font-poppins'>
                  VoxPR embodies a knowledgeable, global PR pro - think early 30s, helpful, 
                  with a focus on clear communication. Developed by Cihan Media, a Growth PR consulting firm in Nigeria, 
                  this sophisticated tool combines AI with PR expertise.
                </p>
              </div>
            </div>

            <div className='flex items-center gap-[48px] w-full'>
              <img src={Analytics} alt='Analytics' className='w-[400px] h-[225px]' />
              <div className='flex flex-col'>
                <p className='text-[#17053E] font-medium text-[32px] font-poppins'>AI Meets <span className='text-[#FF6600]'>Expertise</span></p>
                <p className='text-[#17053E] text-[20px] font-poppins'>
                  Our team of PR veterans and AI developers built VoxPR to streamline your workflow, 
                  amplifying your expertise.
                </p>
              </div>
            </div>

            <div className='flex items-center gap-[48px] w-full'>
              <img src={DataB} alt='DataB' className='w-[400px] h-[225px]' />
              <div className='flex flex-col'>
                <p className='text-[#17053E] font-medium text-[32px] font-poppins'>Your <span className='text-[#FF6600]'>Competitive</span> Edge</p>
                <p className='text-[#17053E] text-[20px] font-poppins'>
                  VoxPR grants you the insights to make impactful, proactive PR moves that stand out in a crowded media landscape.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex items-center justify-between h-[480px] mt-[103px] px-[100px] bg-[#FFF7F2]'>
          <div className='flex flex-col gap-[6px]'>
              <p className='text-[30px] text-[#17053E] font-medium w-[673px]'>
                Our AI driven product helps you to stay ahead of your public 
                image by monitoring trends and helping you control your media narrative.
              </p>
              <button className='w-[371px] rounded-lg p-4 bg-[#FF6600]'>
                <p className='text-[#fff]'>Experience the VoxPR Advantage</p>
              </button>
          </div>
          <div className='flex flex-col relative'>
            <img src={Time} alt='Time' className='w-[208px]  absolute -top-24 '/>
            <img src={Notification} alt='Notification' className='w-[444px] left-14 -top-16 absolute ' />
            <img src={Insights} alt='Insights' className='w-[193px]  top-20 z-40 absolute'/>
             <img src={NotificationB} alt='NotificationB' className='w-[446px] left-14 top-20 relative  ' />
          </div>
        </div>
       
      

      </div>


    </div>
  )
}

export default Home