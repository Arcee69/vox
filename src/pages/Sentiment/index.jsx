import React, { useState } from 'react'
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
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';

const SentimentEngine = () => {
    const [transcription, setTranscription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)

  

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
        const apiUrl = 'https://api.deepgram.com/v1/listen';
        
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
            setTranscription(data?.results?.channels[0]?.alternatives[0]?.words)
            setFile(null)
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


      
  return (
    <div className='mt-[100px] xl:mt-[45px] '>
        <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
            <div className='flex flex-col gap-[48px]'>
                <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[38px]'>Why Choose VoxPR Sentiment Engine?</p>

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

                <div className='flex flex-col gap-4'>
                    <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
                    <button className='xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={textDeepgram}>
                        <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Sentiment Decoder"}</p>
                    </button>
                    {transcription && <p>{transcription}</p>}
                </div>
            

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
    </div>
  )
}

export default SentimentEngine