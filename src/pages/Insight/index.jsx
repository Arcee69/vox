import React, { useState, useEffect } from 'react'
import Vapi from '@vapi-ai/web';
import { CgSpinner } from 'react-icons/cg';

import Monitor from "../../assets/svg/monitor.svg"
import Chart from "../../assets/svg/chart.svg"
import Data from "../../assets/svg/data.svg"
import Reputation from "../../assets/svg/reputation.svg"

import Time from "../../assets/png/time.svg"
import Insights from "../../assets/png/insight.svg"
import Notification from "../../assets/png/notification.png"
import NotificationB from "../../assets/png/notification-b.png"

import Speech from "../../assets/png/VoxSpeech.png"

import ModalPop from '../../components/modalPop';
import RequestForm from './RequestForm';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';

import Decoder from "../../assets/png/decoder.jpg"
import { isObjectEmpty } from '../../utils/CheckLoginData';
import axios from 'axios';


const InsightEngine = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const [voices, setVoices] = useState([])
    const [selectedVoice, setSelectedVoice] = useState("")
    const [text, setText] = useState("")

    const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")))

    console.log(isAuthed, "isAuthed")

    const getVoices = async () => {
        try {
            const res = await axios.get("https://api.elevenlabs.io/v1/voices", {
                headers: {
                    'xi-api-key': "3392b41099e1bfc55980e42d6af4b040"
                }
            });
            console.log(res, "res");
            setVoices(res?.data?.voices);
        } catch (error) {
            console.error("Error fetching voices:", error);
        }
    };

    useEffect(() => {
        getVoices();
    }, []);

    console.log(voices, "voices")
    console.log(selectedVoice, "selectedVoice")

    const handleVoiceChange = (e) => {
        const selectedVoice = e.target.value;
        setSelectedVoice(selectedVoice);
    };

    const submitForm = async () => {
        setLoading(true)
        const data = {
            "text": text,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {
              "stability": 0.1,
              "similarity_boost": 0.3
            }
          }
        
        try {
            const res = await axios.post(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': "3392b41099e1bfc55980e42d6af4b040"
                },
                responseType: 'blob' // Important to handle the binary data correctly
            });
            console.log(res, "audioT");

            // Create a blob from the response data
            const blob = new Blob([res.data], { type: 'audio/mpeg' });
    
            // Create a link element
            const link = document.createElement('a');
    
            // Set the download attribute with a filename
            link.href = window.URL.createObjectURL(blob);
            link.download = `audio_translated.mp3`;
    
            // Append the link to the body
            document.body.appendChild(link);
            
            // Programmatically click the link to trigger the download
            link.click();
            
            // Remove the link from the document
            document.body.removeChild(link);

            setLoading(false)
            // setTranslatedAudio(res?.data?.audio_url)
        } catch (error) {
            setLoading(false)
            console.error("Error fetching voices:", error);
        }
    }

    const showModal = () => {
        if(!isAuthed) {
            submitForm()
        } else {
            setOpenLogin(true)
        }
    }

    const showOpenSignUpModal = () => {
        setOpenLogin(false)
        setOpenSignUp(true)  
    }
    
  


  return (
    <div className=' '>
        <div 
            style={{
                backgroundImage: `url(${Speech})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
            className="w-full h-[456px] lg:h-[534px] flex flex-col lg:flex-row items-center lg:gap-[179px] px-5 lg:px-[80px] py-6"
        >
            <div className='flex flex-col gap-5 mt-20 items-center lg:mt-0 w-full lg:w-5/12'>
                <p className='font-bold text-[#fff] font-satoshi text-[40px] lg:text-[64px]'>Vox Speaks</p>
                <p className='text-[#fff] text-[24px] lg:text-[32px] text-center lg:text-left font-satoshi'>Your 24/7 Audio Reputation advisor</p>
                <button 
                    type='button'
                    className='w-[226px] h-[54px] rounded-xl bg-[#FF6600] flex items-center justify-center'
                >
                    <p className='text-[#fff] font-medium font-satoshi text-[20px]'>See how it works</p>
                </button>
            </div>
            <div className='w-6/12 bg-[#fff] rounded-3xl hidden lg:flex flex-col gap-4 p-[50px]'>
                <p className='font-satoshi text-center text-[18px] text-[#000]'>VoxPR listens, analyzes and enhances your PR success</p>
                <textarea 
                    type='text'
                    value={text}
                    className='w-full lg:w-[491px] border border-[#ccc] outline-none h-[189px] p-4 font-satoshi rounded-lg'
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <select onChange={handleVoiceChange} className='w-full lg:w-[491px] p-2 outline-none border border-[#ccc] rounded-lg'>
                    <option value="">Select a voice</option>
                    {voices?.map((voice, index) => (
                        <option key={index} value={voice?.voice_id}>{voice?.name}</option>
                    ))}
                </select>
                <button className='w-full lg:w-[491px] flex items-center justify-center rounded-lg p-4 bg-[#17053E]' onClick={() => showModal()}>
                    <p className='text-[#fff]'>{loading ? <CgSpinner className=" animate-spin text-xl " /> : "Get Insight"} </p>
                </button>
            </div>

        </div>
        <div className='w-11/12 bg-[#fff] mx-auto mt-10 rounded-3xl lg:hidden flex flex-col gap-4 py-10 px-5 lg:p-[50px]'>
            <p className='font-satoshi text-center text-base text-[#000]'>VoxPR listens, analyzes and enhances your PR success</p>
            <textarea 
                type='text'
                value={text}
                className='w-full border border-[#ccc] outline-none h-[189px] p-4 font-satoshi rounded-lg'
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <select onChange={handleVoiceChange} className='w-full  p-2 outline-none border border-[#ccc] rounded-lg'>
                <option value="">Select a voice</option>
                {voices?.map((voice, index) => (
                    <option key={index} value={voice?.voice_id}>{voice?.name}</option>
                ))}
            </select>
            <button className='w-full lg:w-[491px] flex items-center justify-center rounded-lg p-4 bg-[#17053E]' onClick={() => showModal()}>
                <p className='text-[#fff]'>{loading ? <CgSpinner className=" animate-spin text-xl " /> : "Get Insight"} </p>
            </button>
        </div>

        <div className='mt-[60px] mb-[115px] flex w-full'>
            <div className='w-10/12 mx-auto flex flex-col gap-[32px] '>
                <p className='text-[28px] lg:text-[48px] font-satoshi font-bold text-[#1C1C1C]'>How it works</p>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-[40px] lg:gap-[56px] items-center'>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>We Listen:</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Our advanced AI reputation Management advisor listens to the reputation management challenges 
                            you face and provide clear analysis.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6  w-full lg:w-[278px]'>
                        <img src={Chart} alt='Chart' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>We Understand:</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Our advanced AI reputation Management advisor listens to the reputation management challenges 
                            you face and provide clear analysis.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Data} alt='Data' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>We Advise:</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            We provide data-driven recommendations to help you craft effective responses, 
                            refine your messaging, and strengthen your brand's reputation.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Reputation} alt='Reputation' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold  font-satoshi text-[20px] lg:text-[24px]'>Make Informed Decisions:</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Leverage on data-driven insights to gain clearer perspective, 
                            shape your communication strategies and build a stronger brand.
                        </p>
                    </div>

                </div>

            </div>

        </div>

        <div className='w-full bg-[#FFF7F2] relative flex justify-between h-auto'>
            <img src={Notification} alt='NotificationB' className='w-[350px] hidden lg:block absolute top-0 ' />
            <img src={Time} alt='Time' className='w-[172px] absolute -left-10 top-0 lg:hidden h-[82px]'/>
            <div className='flex flex-col gap-8  w-full lg:w-8/12 mx-5 lg:mx-auto my-[60px] items-center'>
                <img src={Insights} alt='Insights' className='w-[159px] hidden lg:flex h-[59px]'/>
                
                <p className='lg:w-6/12 font-satoshi mt-5 lg:mt-0 font-bold text-[20px] lg:text-[24px] text-center'>
                    Our AI driven product helps you to stay ahead of your public image by monitoring trends 
                    and helping you control your media narrative.
                </p>
                <button
                    type='button'
                    className='w-[303px] bg-[#17053E] p-4 flex items-center justify-center rounded-3xl'
                    // onClick={() => setOpen(true)}
                >
                    <p className='font-satoshi text-[20px] font-medium text-[#fff]'>Request free consultation</p>
                </button>
                <img src={Time} alt='Time' className='w-[172px] hidden lg:flex h-[82px]'/>
            </div>  
            <img src={NotificationB} alt='Notification' className='w-[359px] hidden lg:block absolute bottom-0 right-0' />  
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


{/* <div className='mt-[100px] xl:mt-[45px] '>
        <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
        <div className='flex flex-col gap-[48px]'>
            <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[38px]'>Vox Reputation: Your 24/7 Audio Reputation Advisor</p>

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
            <textarea 
                type='text'
                value={text}
                className='w-full border border-[#ccc] outline-none h-[250px] p-4 font-poppins rounded-lg'
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <select onChange={handleVoiceChange} className='w-full p-2 outline-none border border-[#ccc] rounded-lg'>
                    <option value="">Select a voice</option>
                    {voices?.map((voice, index) => (
                        <option key={index} value={voice?.voice_id}>{voice?.name}</option>
                ))}
            </select>
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

    </div> */}