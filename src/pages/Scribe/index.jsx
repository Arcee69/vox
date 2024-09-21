import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import RecordRTC from 'recordrtc';
import axios from "axios";
import { Deepgram } from '@deepgram/sdk';

import Monitor from "../../assets/svg/monitor.svg";
import Chart from "../../assets/svg/chart.svg";
import Data from "../../assets/svg/data.svg";
import Reputation from "../../assets/svg/reputation.svg";

import Time from "../../assets/png/time.svg";
import Insights from "../../assets/png/insight.svg";
import Notification from "../../assets/png/notification.svg";
import NotificationB from "../../assets/png/notification-b.svg";

const Scribe = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [loading, setLoading] = useState(false);

    const deepgramApiKey = import.meta.env.VITE_APP_DEEPGRAM_API_KEY;
    const socket = useRef(null);  // Store WebSocket reference
    const recorder = useRef(null);  // Store MediaRecorder reference

    const startMicrophone = async () => {
        try {
            // Open WebSocket when microphone starts
            const websocket = new WebSocket(
                `wss://api.deepgram.com/v1/listen?access_token=${deepgramApiKey}&punctuate=true`
            );

            websocket.onopen = () => {
                console.log('WebSocket connection established');
                setLoading(false);
            };

            websocket.onmessage = (message) => {
                const data = JSON.parse(message.data);
                if (data.channel && data.channel.alternatives[0]) {
                    const transcription = data.channel.alternatives[0].transcript;
                    setTranscript(prev => prev + " " + transcription);
                }
            };

            websocket.onerror = (error) => {
                console.error('WebSocket Error: ', error);
            };

            websocket.onclose = () => {
                console.log('WebSocket connection closed');
            };

            socket.current = websocket;  // Store WebSocket in ref

            // Start microphone recording
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0 && socket.current?.readyState === WebSocket.OPEN) {
                    socket.current.send(event.data);  // Send audio to Deepgram
                }
            };

            mediaRecorder.start(250);  // Send chunks of audio every 250ms
            recorder.current = mediaRecorder;  // Store MediaRecorder in ref

            setIsRecording(true);
        } catch (error) {
            console.error('Microphone access denied: ', error);
        }
    };

    const stopMicrophone = () => {
        // Stop recording and close WebSocket
        if (recorder.current) {
            recorder.current.stop();
            setIsRecording(false);
        }

        if (socket.current) {
            socket.current.close();
        }
    };

    return (
        <div className='mt-[100px] xl:mt-[45px] '>
            <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
                <div className='flex flex-col gap-[48px]'>

                    <div className='flex xl:hidden flex-col mt-10 xl:mt-0 gap-[32px]'>
                        <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
                            <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Get Audio Transcription Now</p>
                        </div>
                        
                        <div className='flex flex-col items-center gap-4'>
                            {isRecording ? (
                            <button 
                                className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' 
                                onClick={stopMicrophone}
                            >
                                <p className='text-[#fff] '>Stop recording</p>
                            </button>
                            ) : (
                            <button 
                                className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' 
                                onClick={startMicrophone}
                            >
                                <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Voxscribe"}</p>
                            </button>
                            )}
                        </div>
                        
                        <textarea
                            type="text"
                            value={transcript}
                            className='w-full border border-[#ccc] h-[250px] p-4 font-poppins rounded-lg'
                            readOnly
                        ></textarea>
                    </div>

                    <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[28px]'>VoxScribe (Live Transcription and Press Release Automation Tool): </p>
                    
                    <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
                        Tired of tedious manual transcription and struggling to craft impactful press releases? 
                        VoxScribe is your one-stop solution for turning spoken words into valuable content, instantly. 
                        It offers a near-zero-percent error rate.
                    </p>

                    <div className='flex flex-col gap-4 xl:w-[458px]'>
                        <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                        <p className='text-[#17053E] text-[24px]'>Live Transcription:</p>
                        <p className='font-medium text-[#8F899C]'>
                            Capture every word of interviews, meetings, events, and press conferences in 
                            real-time with unparalleled accuracy. 
                        </p>
                    </div>

                    <div className='flex flex-col gap-4 xl:w-[458px]'>
                        <img src={Chart} alt='Chart' className='w-6 h-6'/>
                        <p className='text-[#17053E] text-[24px]'>Multi-Language Support: </p>
                        <p className='font-medium text-[#8F899C]'>
                            Transcribe conversations in multiple languages effortlessly, removing communication barriers. 
                        </p>
                    </div>

                    <div className='flex flex-col gap-4 xl:w-[458px]'>
                        <img src={Data} alt='Data' className='w-6 h-6'/>
                        <p className='text-[#17053E] text-[24px]'>Speaker Identification: </p>
                        <p className='font-medium text-[#8F899C]'>
                            Easily distinguish between different speakers for clear and organized transcripts. 
                        </p>
                    </div>

                    <div className='flex flex-col gap-4 xl:w-[458px]'>
                        <img src={Reputation} alt='Monitor' className='w-6 h-6'/>
                        <p className='text-[#17053E] text-[24px]'>Keyword Highlighting:</p>
                        <p className='font-medium text-[#8F899C]'>
                            Aptly identify key topics and themes within your transcripts to 
                            save time and to help focus on your analysis.
                        </p>
                    </div>

                </div>

                <div className='xl:flex flex-col mt-10 hidden xl:mt-0 gap-[32px]'>
                    <div className='flex flex-col  xl:w-[600px] gap-2 '>
                        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Get Audio Transcription Now</p>
                    </div>
                
                    <div className='flex flex-col items-center gap-4'>
                        {isRecording ? (
                            <button 
                                className='w-full text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' 
                                onClick={stopMicrophone}
                            >
                                <p className='text-[#fff] '>Stop recording</p>
                            </button>
                        ) : (
                            <button 
                                className='w-full text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' 
                                onClick={startMicrophone}
                            >
                                <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Voxscribe"}</p>
                            </button>
                        )}
                    </div>

                    <textarea
                        type="text"
                        value={transcript}
                        className='w-full border border-[#ccc] h-[250px] p-4 font-poppins rounded-lg'
                        readOnly
                    ></textarea>
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
                    <button type='button' className='xl:w-[371px] mt-2 rounded-lg bg-[#17053E] p-4' onClick={() => setOpenForm(true)}>
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
        </div>
    );
};

export default Scribe;