import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';
import { createClient } from "@deepgram/sdk";

import Monitor from "../../assets/svg/monitor.svg"
import Chart from "../../assets/svg/chart.svg"
import Data from "../../assets/svg/data.svg"
import Reputation from "../../assets/svg/reputation.svg"

import Computer from "../../assets/png/computer.png"

import Time from "../../assets/png/time.svg"
import Insights from "../../assets/png/insight.svg"
import Notification from "../../assets/png/notification.svg"
import NotificationB from "../../assets/png/notification-b.svg"
import ModalPop from '../../components/modalPop';

import Words from './Words';

import Listen from "../../assets/png/listen.jpg"


const SentimentEngine = () => {
    const [transcription, setTranscription] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

  

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
        const apiUrl =  'https://api.deepgram.com/v1/listen?model=nova-2'; //'https://api.deepgram.com/v1/listen';
        
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
            setTranscription(data?.results?.channels[0]?.alternatives[0]?.transcript)
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


   
    // :.
    // : 
    // :
    // : 
    //
    
    // 
    // 
    // 
    // 


      
  return (
    <div className='mt-[100px] xl:mt-[45px] '>
        <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
            <div className='flex flex-col gap-[48px]'>
                <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[28px]'>Sentiment Decoder: Your Audio Analysis Powerhouse for PR</p>
                
                <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
                    Cut through the noise and understand the true impact of your communications. Our
                    advanced AI tool analyzes audio and text to reveal sentiment, key topics, intent, and
                    streamline transcription
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
            <div className='flex flex-col mt-10 xl:mt-0 gap-[32px]'>
                <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Get Audio Insights Now</p>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Upload your audio file and start analyzing</p>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>We accept over 40 common audio file formats including MP3, WAV, FLAC, M4A and more.</p>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
                    <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={textDeepgram}>
                        <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Sentiment Decoder"}</p>
                    </button>
                </div>

                <img src={Listen} alt='Listen' className='xl:w-[600px]'/>
            </div>
        </div>
    

        <div className='w-full flex flex-col xl:flex-row items-center mb-10 justify-between py-10 xl:py-0 xl:h-[480px] mt-[103px] px-[20px] xl:px-[100px] bg-[#FFF7F2]'>
            <div className='flex flex-col gap-[6px]'>
                <p className=' flex flex-col gap-4  xl:w-[673px]'>
                  <p className='text-2xl xl:text-[30px] text-[#17053E] font-semibold'> How PR Pros Benefit</p>
                  <p className='text-base'><span className='font-medium'>Crisis Management:</span> Quickly gauge public sentiment in a crisis.</p>
                  <p className='text-base'><span className='font-medium'>Media Monitoring:</span> Track the impact of press coverage and competitor activity.</p>
                  <p className='text-base'><span className='font-medium'>Campaign Evaluation:</span> Measure the emotional resonance of your messaging.</p>
                  <p className='text-base'><span className='font-medium'>Stakeholder Insights:</span> Understand the true needs and concerns of your audience.</p>
                </p>
                {/* <button type='button' className='xl:w-[371px] rounded-lg bg-[#17053E] p-4' onClick={() => setOpen(true)}>
                    <p className='text-[#fff]'>Request Free Consultation</p>
                    </button> */}
            </div>
            <div className='flex-col relative hidden xl:flex'>
                <img src={Time} alt='Time' className='w-[208px]  absolute -top-24 '/>
                <img src={Notification} alt='Notification' className='w-[444px] left-14 -top-16 absolute ' />
                <img src={Insights} alt='Insights' className='w-[193px]  top-20 z-40 absolute'/>
                <img src={NotificationB} alt='NotificationB' className='w-[446px] left-14 top-20 relative  ' />
            </div>
        </div>

        <ModalPop isOpen={open}>
            <Words handleClose={() => setOpen(false)} transcription={transcription}/>
        </ModalPop>

    </div>
  )
}

export default SentimentEngine

{/* <div className='flex flex-col xl:flex-row justify-between px-[20px] mb-10 xl:px-[100px]'>
<div className='flex xl:hidden flex-col gap-4 w-full '>
    <div className='border flex flex-col items-center text-center gap-2 border-blue-300 p-4'>
        <p>Get Audio Insights Now</p>
        <p>Upload your audio file and start analyzing</p>
        <p>We accept over 40 common audio file formats including MP3, WAV, FLAC, M4A and more.</p>
    </div>

    <div className='flex flex-col items-center gap-4'>
        <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
        <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={textDeepgram}>
            <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Sentiment Decoder"}</p>
        </button>
    </div>
    <div>
        <img src={Decoder} alt='Decoder' className='h-[200px] w-full'/>
    </div>
</div>
<div className='flex flex-col mt-4 xl:mt-0 gap-4 w-full xl:w-[48%]'>
    <div className='border border-blue-300 p-4'>
        <p>Sentiment Decoder: Your Audio Analysis Powerhouse for PR</p>
    </div>
    <div className='border border-blue-300 p-4'>
        <p>
            Cut through the noise and understand the true impact of your communications. Our
            advanced AI tool analyzes audio and text to reveal sentiment, key topics, intent, and
            streamline transcription
        </p>
    </div>
    <div className='border border-blue-300 p-4 flex flex-col'>
        <p className='font-semibold'>Features:</p>
        <ul className='list-disc p-3 gap-3 flex flex-col'>
            <li>Summarization: Get the gist of conversations instantly.</li>
            <li>Topic Detection: Pinpoint the key themes discussed.</li>
            <li>Intent Detection: Reveal the true purpose behind the words.</li>
            <li>Sentiment Analysis: Gauge emotions with precision.</li>
            <li>Transcription: Effortlessly convert spoken word into searchable data.</li>
        </ul>
    </div>
</div>
<div className='hidden xl:flex flex-col gap-4 w-[48%]'>
    <div className='border flex flex-col items-center text-center gap-2 border-blue-300 p-4'>
        <p>Get Audio Insights Now</p>
        <p>Upload your audio file and start analyzing</p>
        <p>We accept over 40 common audio file formats including MP3, WAV, FLAC, M4A and more.</p>
    </div>

    <div className='flex flex-col items-center gap-4'>
        <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
        <button className='xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={textDeepgram}>
            <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Sentiment Decoder"}</p>
        </button>
    </div>
    <div>
        <img src={Decoder} alt='Decoder' className='h-[200px] w-full'/>
    </div>
</div>
</div> */}
