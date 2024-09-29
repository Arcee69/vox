import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';
import { createClient } from "@deepgram/sdk";

import Monitor from "../../assets/svg/monitor.svg"
import Chart from "../../assets/svg/chart.svg"
import Data from "../../assets/svg/data.svg"
import Reputation from "../../assets/svg/reputation.svg"

import Sentiment from "../../assets/png/VoxSentiment.png"
import Upload from "../../assets/png/upload.png"

import Time from "../../assets/png/time.svg"
import Insights from "../../assets/png/insight.svg"
import Notification from "../../assets/png/notification.png"
import NotificationB from "../../assets/png/notification-b.png"
import ModalPop from '../../components/modalPop';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';

import Words from './Words';

import Listen from "../../assets/png/listen.jpg"
import RequestForm from '../Insight/RequestForm';
import { isObjectEmpty } from '../../utils/CheckLoginData';


const SentimentEngine = () => {
    const [transcription, setTranscription] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      };


    const textDeepgram = () => {
        setLoading(true)
        if (!file) {
            setLoading(false)
            toast(`No file selected`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            console.error('No file selected');
            return;
        }
    

        // Replace 'YOUR_API_KEY' with your actual Deepgram API key
        const apiKey =  "480b0bf91968cf6cd1b46936dbac6fc1f005295a"; //"e3d86a51a6e86980a36159fc4ba0554b3170782b";
        
        // Construct the URL for Deepgram's transcription API endpoint
        const apiUrl =  'https://api.deepgram.com/v1/listen?summarize=v2&topics=true&intents=true&smart_format=true&punctuate=true&utterances=true&sentiment=true&language=en&model=nova-2'; 
        //'https://api.deepgram.com/v1/listen?model=nova-2'; "
        
        // Construct the request body
        const formData = new FormData();
        formData.append('content', file);
        formData.append('language', 'en-US'); // Adjust language code as needed
        formData.append('punctuate', 'true'); // Add punctuation to the transcript

        // Make the HTTP POST request to the Deepgram API
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${apiKey}`,
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response data here
            console.log(data);
            setLoading(false)
            toast(`Audio Transcribe Successfully`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            setTranscription(data?.results)
            setOpen(true)
        })
        .catch(error => {
            // Handle errors
            setLoading(false)
            toast(`Error`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            console.error('Error:', error);
        });
    };

    const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")))

    console.log(isAuthed, "isAuthed")

    const showModal = () => {
        if(!isAuthed) {
            textDeepgram()
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
                backgroundImage: `url(${Sentiment})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
            className="w-full h-[456px] lg:h-[534px] flex flex-col lg:flex-row items-center gap-[179px] px-5 lg:px-[80px] py-6"
        >
            <div className='flex flex-col gap-3 lg:gap-5 w-full mt-14 lg:mt-0 lg:w-5/12'>
                <p className='font-bold text-[#fff] text-center lg:text-left font-satoshi text-[40px] lg:text-[54px]'>Vox Sentiment</p>
                <p className='text-[#fff] text-[22px] text-center lg:text-left font-satoshi'>
                    Uncover hidden meanings in both audio and text to inform 
                    your strategies with this sentiment analysis tool
                </p>
                <button 
                    type='button'
                    className='w-[226px] h-[54px] mx-auto lg:mx-0 rounded-xl bg-[#FF6600] flex items-center justify-center'
                >
                    <p className='text-[#fff] font-medium font-satoshi text-[20px]'>See how it works</p>
                </button>
            </div>
            <div className='w-6/12 bg-[#fff] hidden rounded-3xl  lg:flex flex-col gap-4 p-[50px]'>
                <p className='font-satoshi text-center font-medium text-[18px] text-[#000]'>Get Audio Insights Now</p>
                <div className='flex flex-col lg:mx-auto  bg-transparent rounded-xl items-center lg:w-[491px] border-dashed border-[#D0D5DD] border px-6 py-[28px]  gap-[16px]'>
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
                    <p className='text-[#fff]'>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Sentiment"} </p>
                </button>
            </div>

        </div>
        <div className='w-11/12 bg-[#fff] rounded-3xl mx-auto mt-10  lg:hidden flex flex-col gap-4 py-10 p-5'>
            <p className='font-satoshi text-center font-medium text-[18px] text-[#000]'>Get Audio Insights Now</p>
            <div className='flex flex-col lg:mx-auto  bg-transparent rounded-xl items-center w-full border-dashed border-[#D0D5DD] border px-6 py-[28px]  gap-[16px]'>
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
                <p className='text-[#fff]'>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Sentiment"} </p>
            </button>
        </div>

        <div className='mt-[60px] mb-[115px] flex w-full'>
            <div className='w-10/12 mx-auto flex flex-col gap-[32px] '>
                <p className='text-[28px] lg:text-[48px] font-satoshi font-bold text-[#1C1C1C]'>How it works</p>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-[40px] lg:gap-[56px] items-center'>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>Summarization</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Quickly grasp the core message of interviews, press mentions, and focus groups.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Chart} alt='Chart' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>Topic Detection</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Track how your brand or campaign is discussed across various media.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Data} alt='Data' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>Intent Detection</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Discover the underlying motivations behind journalist questions or customer feedback.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Reputation} alt='Reputation' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>Sentiment Analysis</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Measure the emotional tone of coverage, social mentions, and stakeholder communications.
                        </p>
                    </div>

                </div>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-[40px] lg:gap-[56px] items-center'>
                    <div className='flex flex-col items-start gap-6  w-full lg:w-[278px]'>
                        <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>Transcription</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Turn presentations, podcasts, and media appearances into searchable text
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6  w-full lg:w-[278px]'>
                        <img src={Chart} alt='Chart' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>Punctuation</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Ensure polished transcripts for reports and analysis.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Data} alt='Data' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>Smart Format</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Present professional, accurate outputs.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Reputation} alt='Reputation' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold  font-satoshi text-[20px] lg:text-[24px]'>Utterances</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Analyze conversations for insightful soundbites and key takeaways.
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
                    Our AI driven product helps you to stay ahead of your public image by 
                    monitoring trends and helping you control your media narrative.
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

        <ModalPop isOpen={open}>
            <Words handleClose={() => setOpen(false)} transcription={transcription}/>
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

export default SentimentEngine


{/* <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
            <div className='flex flex-col gap-[48px]'>

                <div className='flex xl:hidden flex-col mt-10 xl:mt-0 gap-[32px]'>
                    <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
                        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Get Audio Insights Now</p>
                        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Upload your audio file and start analyzing</p>
                        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>We accept over 40 common audio file formats including MP3, WAV, FLAC, M4A and more.</p>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
                        <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={textDeepgram}>
                            <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Sentiment"}</p>
                        </button>
                    </div>

                    <img src={Listen} alt='Listen' className='xl:w-[600px]'/>
                </div>

                <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[28px]'>Vox Sentiment (Sentiment Analysis Tool): </p>
                
                <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
                    {/* Cut through the noise and understand the true impact of your communications. Our
                    advanced AI tool analyzes audio and text to reveal sentiment, key topics, intent, and
                    streamline transcription 
                    Uncover hidden meanings in both audio and text to inform your strategies

                </p>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Summarization</p>
                    <p className='font-medium text-[#8F899C]'>
                        Quickly grasp the core message of interviews, press mentions, and focus groups.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Chart} alt='Chart' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Topic Detection</p>
                    <p className='font-medium text-[#8F899C]'>
                        Track how your brand or campaign is discussed across various media.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Data} alt='Data' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Intent Detection</p>
                    <p className='font-medium text-[#8F899C]'>
                        Discover the underlying motivations behind journalist questions or customer feedback.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Reputation} alt='Monitor' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Sentiment Analysis</p>
                    <p className='font-medium text-[#8F899C]'>
                        Measure the emotional tone of coverage, social mentions, and stakeholder communications.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Transcription</p>
                    <p className='font-medium text-[#8F899C]'>
                        Turn presentations, podcasts, and media appearances into searchable text
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Chart} alt='Chart' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Punctuation</p>
                    <p className='font-medium text-[#8F899C]'>
                        Ensure polished transcripts for reports and analysis.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Data} alt='Data' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Smart Format</p>
                    <p className='font-medium text-[#8F899C]'>
                        Present professional, accurate outputs.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Reputation} alt='Reputation' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Utterances</p>
                    <p className='font-medium text-[#8F899C]'>
                        Analyze conversations for insightful soundbites and key takeaways.
                    </p>
                </div>

            </div>

            <div className='xl:flex flex-col mt-10 hidden xl:mt-0 gap-[32px]'>
                <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Get Audio Insights Now</p>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Upload your audio file and start analyzing</p>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>We accept over 40 common audio file formats including MP3, WAV, FLAC, M4A and more.</p>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
                    <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={() => showModal()}> {/*{textDeepgram} 
                        <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Sentiment"}</p>
                    </button>
                </div>

                <img src={Listen} alt='Listen' className='xl:w-[600px]'/>
            </div>

        </div> */}