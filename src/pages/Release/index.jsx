import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';
import { AssemblyAI } from 'assemblyai'

import Monitor from "../../assets/svg/monitor.svg"
import Chart from "../../assets/svg/chart.svg"
import Data from "../../assets/svg/data.svg"
import Reputation from "../../assets/svg/reputation.svg"

import Computer from "../../assets/png/computer.png"
import VoxRelease from "../../assets/png/VoxRelease.png"

import Upload from "../../assets/png/upload.png"
import Shake from "../../assets/png/shake.png"

import Time from "../../assets/png/time.svg"
import Insights from "../../assets/png/insight.svg"
import Notification from "../../assets/png/notification.png"
import NotificationB from "../../assets/png/notification-b.png"
import ModalPop from '../../components/modalPop';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';



import Listen from "../../assets/png/listen.jpg"
import RequestForm from '../Insight/RequestForm';
import { isObjectEmpty } from '../../utils/CheckLoginData';
import Result from './Result';


const Release = () => {
    const [transcription, setTranscription] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const [openResult, setOpenResult] = useState(false)
    const [showResult, setShowResult] = useState([])


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      };

      const client = new AssemblyAI({
        apiKey: import.meta.env.VITE_APP_ASSEMBLY_AI_API_KEY  
      })

    const audioUrl = file

    const run = async () => {
        setLoading(true)
        // Step 1: Transcribe an audio file.
        const transcript = await client.transcripts.transcribe({ audio: audioUrl })

        console.log(transcript, "faoao")
      
        // Step 2: Define a prompt to generate content.
        const prompt = 'Write a SEO-optimized article based on the audio transcript.'

        const data = {
            prompt: prompt,
            transcript_ids: [transcript?.id]
        }


        // Run a task using LeMUR (POST /lemur/v3/generate/task)
        const response = await fetch("https://api.assemblyai.com/lemur/v3/generate/task", {
            method: "POST",
            headers: {
                "Authorization": "e2e85fbc06704e94bf249dc576d1145a",
                "Content-Type": "application/json",
                // "Access-Control-Allow-Methods": "*",
                // "Access-Control-Allow-Origin": "https://www.assemblyai.com",
                // "Access-Control-Allow-Credentials": true,
                // "Mode": "no-cors"
            },
            body: JSON.stringify({
            "prompt": 'Generate a professional press release based on the provided audio file. The press release should include a compelling and attention-grabbing headline, detailed body paragraphs that highlight key points and incorporate relevant quotes from the audio and contact information at the end. Please ensure that the headline and paragraphs are well-spaced, properly aligned, and professionally formatted for optimal readability.',
            "context": "",
            "final_model": "default",
            "max_output_size": 3000,
            "temperature": 0,
            "transcript_ids": [
                transcript?.id
            ]
            }),
        });
        
        setLoading(false)
        const body = await response.json();
        console.log(body, "lambo");
        setShowResult(body)
      
        if(body.response) {
            setOpenResult(true)
        }
      
        console.log(response, "caro")
    }

   
    const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")))

    console.log(isAuthed, "isAuthed")

    const showModal = () => {
        if(!isAuthed) {
            run()
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
                backgroundImage: `url(${VoxRelease})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
            className='h-[534px] flex flex-col items-center gap-5 justify-center'
        >
            <p className='font-satoshi font-bold text-[40px] lg:text-[64px] text-[#fff]'>VoxRelease</p>
            <p className='font-satoshi text-[24px] lg:text-[32px] lg:w-[412px] text-[#fff] text-center'>Your expert partner for impactful press releases.</p>
            <button 
                type='button'
                className='w-[226px] h-[54px] rounded-xl bg-[#FF6600] flex items-center justify-center'
            >
                <p className='text-[#fff] font-medium font-satoshi text-[20px]'>See how it works</p>
            </button>
        </div>

        <div className='w-full bg-[#FFF7F2] relative flex flex-col gap-[23px] h-[527px] lg:h-[643px]'>
            <div className='w-full px-5 lg:w-8/12 flex flex-col items-center py-[86px]  lg:px-[80px] mx-auto gap-5'>
                <p className='text-[20px] lg:text-[48px] font-bold font-satoshi text-[#1C1C1C]'>Amplify your Brand’s voice</p>
                <p className='text-[15px] lg:text-[18px] font-satoshi text-[#000] text-center'> 
                    Upload your content, and let us handle the rest — ensuring your announcements not only reach the media 
                    but truly resonate. Save time and focus on what matters most: driving your success.
                </p>
                <div className='flex flex-col lg:mx-auto  bg-[#FAF1ED] rounded-xl items-center lg:w-[491px] px-6 py-[28px]  gap-[16px]'>
                    <div className='p-[9px] w-[300px] cursor-pointer flex justify-center gap-[16px] '>
                        {  
                            file?.name ? 
                                <div className='flex flex-col gap-1'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-[15px] font-hanken text-[#858585]'>{file?.name}</p>
                                        <p className='text-[#000] text-[11px]'>Completed</p>
                                    </div>
                                    <div className='w-[266px] h-[5px] bg-[#51E38B] rounded-lg'></div>
                                </div> 
                                :
                                <div className='flex flex-col items-center gap-[16px]'>
                                    <img src={Upload} alt='upload' className='w-[56px] h-[56px' />
                                    <label htmlFor="fileInput" className='cursor-pointer px-[22px] flex justify-center items-center '>
                                        <div className='flex flex-col'>
                                            <p className='text-sm font-semibold font-sataoshi text-[#17053E]'>
                                                Click to upload <span className='text-[#475367]'>or drag and drop</span>
                                            </p>
                                            <p className='text-xs text-center font-medium text-[#98A2B3]'>SVG, PNG, JPG or GIF (max. 800x300px)</p>
                                        </div>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            accept='pdf, docx'
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                        }
                        
                    </div>
                </div>
                <button className='w-full lg:w-[491px] flex items-center justify-center rounded-lg p-4 bg-[#17053E]' onClick={() => showModal()}>
                    <p className='text-[#fff]'>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Release"} </p>
                </button>
            </div>
        </div>

        <div className='w-full flex flex-col gap-[32px] py-[49px] lg:py-[102px] px-5 lg:px-[80px]'>
            <div className='flex flex-col gap-5 lg:w-[671px]'>
                <p className='text-[#1C1C1C] font-bold font-satoshi text-[28px] lg:text-[48px]'>Why choose VoxRelease</p>
                <p className='font-satoshi text-[#505052] font-medium text-[15px] lg:text-[18px]'>
                    Our expert team ensures your news is communicated effectively, 
                    engaging your audience and making a lasting impact
                </p>
            </div>
            <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-[91px] '>
                <img src={Shake} alt='Shake' className='w-full h-[340px] lg:hidden' />
                <div className='flex flex-col gap-[48px] '>
                    <div className='flex gap-6 flex-col'>
                        <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-satoshi font-bold text-[20px] lg:text-[24px]'>Precision in Communication:</p>
                        <p className='font-medium font-satoshi text-base text-[#363637]'>
                            Our press releases are carefully crafted to be concise, impactful, and easy to understand, 
                            ensuring your message reaches the right people, in the right way.
                        </p>
                    </div>
                    <div className='flex gap-6 flex-col'>
                        <img src={Chart} alt='Chart' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-satoshi font-bold text-[20px] lg:text-[24px]'>Professional Tone and Style: </p>
                        <p className='font-medium font-satoshi text-base text-[#363637]'>
                            With our deep understanding of industry standards and media formats, VoxRelease delivers polished, 
                            credible content that adheres to AP Style and fits seamlessly into any publication.
                        </p>
                    </div>
                    <div className='flex gap-6 flex-col'>
                        <img src={Data} alt='Data' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-satoshi font-bold text-[20px] lg:text-[24px]'>Tailored to Your Audience: </p>
                        <p className='font-medium font-satoshi text-base text-[#363637]'>
                            We analyze your news and target audience to ensure the language, tone, and structure of your release 
                            are perfectly aligned for maximum engagement.
                        </p>
                    </div>
                </div>
                <img src={Shake} alt='Shake' className='w-[662px] h-[672px] hidden lg:flex' />
            </div>
        </div>

        <div className='w-full bg-[#FFF7F2] relative flex justify-between h-auto'>
            <img src={Notification} alt='NotificationB' className='w-[350px] hidden lg:block absolute top-0 ' />
            <img src={Time} alt='Time' className='w-[172px] absolute -left-10 top-0 lg:hidden h-[82px]'/>
            <div className='flex flex-col gap-8  w-full lg:w-8/12 mx-5 lg:mx-auto my-[60px] items-center'>
                <img src={Insights} alt='Insights' className='w-[159px] hidden lg:flex h-[59px]'/>
                
                <p className='lg:w-6/12 font-satoshi mt-5 lg:mt-0 font-bold text-[20px] lg:text-[24px] text-center'>
                    Transform Your News Into Powerful Stories with VoxRelease At VoxRelease, 
                    we specialize in crafting professional, clear, and compelling press releases that get your message heard. 
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
        

        <ModalPop isOpen={openForm}>
            <RequestForm handleClose={() => setOpenForm(false)} />
        </ModalPop>

        <ModalPop isOpen={openLogin}>
            <Login handleClose={() => setOpenLogin(false)} showOpenSignUpModal={showOpenSignUpModal}/>
        </ModalPop>

        <ModalPop isOpen={openSignUp}>
            <SignUp handleClose={() => setOpenSignUp(false)}/>
        </ModalPop>

        <ModalPop isOpen={openResult}>
            <Result handleClose={() => setOpenResult(false)} showResult={showResult} />
        </ModalPop>

    </div>
  )
}

export default Release


{/* <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
<div className='flex flex-col gap-[48px]'>

    <div className='flex xl:hidden flex-col mt-10 xl:mt-0 gap-[32px]'>
        <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
            <p className='text-[#17053E] text-[22px] font-poppins font-medium'>VoxRelease: Amplify Your Brand’s Voice</p>
            <p className='text-[#17053E] text-[22px] font-poppins font-medium'>With VoxRelease, your announcements don't just reach the media — they resonate. Let us handle the complexity of creating high-quality press releases so you can focus on driving your success. Your story, told right.</p>
            <p className='text-[#17053E] text-[22px] font-poppins font-medium'>We accept over 40 common audio file formats including MP3, WAV, FLAC, M4A and more.</p>
        </div>
        <div className='flex flex-col items-center gap-4'>
            <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
            <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={() => run()}>
                <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Release"}</p>
            </button>
        </div>

        <img src={Listen} alt='Listen' className='xl:w-[600px]'/>
    </div>

    <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[28px]'>VoxRelease: Your Expert Partner for Impactful Press Releases</p>
    
    <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
        Transform Your News Into Powerful Stories with VoxRelease
        At VoxRelease, we specialize in crafting professional, clear, and compelling press releases that get your 
        message heard. Whether you're announcing a new product, service, or milestone, our expert team ensures your 
        news is communicated effectively, engaging your audience and making a lasting impact.
    </p>

    <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
        Why Choose VoxRelease?
    </p>

    <div className='flex flex-col gap-4 xl:w-[458px]'>
        <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
        <p className='text-[#17053E] text-[24px]'>Precision in Communication:</p>
        <p className='font-medium text-[#8F899C]'>
            Our press releases are carefully crafted to be concise, impactful, and easy to understand, 
            ensuring your message reaches the right people, in the right way.
        </p>
    </div>

    <div className='flex flex-col gap-4 xl:w-[458px]'>
        <img src={Chart} alt='Chart' className='w-6 h-6'/>
        <p className='text-[#17053E] text-[24px]'>Professional Tone and Style: </p>
        <p className='font-medium text-[#8F899C]'>
            With our deep understanding of industry standards and media formats, VoxRelease delivers polished, 
            credible content that adheres to AP Style and fits seamlessly into any publication.
        </p>
    </div>

    <div className='flex flex-col gap-4 xl:w-[458px]'>
        <img src={Data} alt='Data' className='w-6 h-6'/>
        <p className='text-[#17053E] text-[24px]'>Tailored to Your Audience: </p>
        <p className='font-medium text-[#8F899C]'>
            We analyze your news and target audience to ensure the language, tone, and structure of your release 
            are perfectly aligned for maximum engagement.
        </p>
    </div>

    <div className='flex flex-col gap-4 xl:w-[458px]'>
        <img src={Reputation} alt='Monitor' className='w-6 h-6'/>
        <p className='text-[#17053E] text-[24px]'>Engaging, Data-Driven Content: </p>
        <p className='font-medium text-[#8F899C]'>
            We incorporate relevant quotes, data, and statistics to strengthen your message, 
            making your news not only informative but also persuasive and newsworthy.
        </p>
    </div>

   <div className='flex flex-col gap-4 xl:w-[458px]'>
        <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
        <p className='text-[#17053E] text-[24px]'>Error-Free Excellence:</p>
        <p className='font-medium text-[#8F899C]'>
            Every release undergoes rigorous editing to ensure it's free of grammatical errors, 
            inconsistencies, and ambiguity, giving you the peace of mind that your content is flawless.
        </p>
    </div>


</div>

<div className='xl:flex flex-col mt-10 hidden xl:mt-0 gap-[32px]'>
    <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>VoxRelease: Amplify Your Brand’s Voice</p>
        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>With VoxRelease, your announcements don't just reach the media — they resonate. Let us handle the complexity of creating high-quality press releases so you can focus on driving your success. Your story, told right.</p>
        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>We accept over 40 common audio file formats including MP3, WAV, FLAC, M4A and more.</p>
    </div>
    <div className='flex flex-col items-center gap-4'>
        <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
        <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={() => showModal()}> 
            <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Release"}</p>
        </button>
    </div>

    <img src={Listen} alt='Listen' className='xl:w-[600px]'/>
</div>

</div> */}