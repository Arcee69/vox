import React, { useState, useRef } from 'react'
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import RecordRTC from 'recordrtc';

import Monitor from "../../assets/svg/monitor.svg"
import Chart from "../../assets/svg/chart.svg"
import Data from "../../assets/svg/data.svg"
import Reputation from "../../assets/svg/reputation.svg"

import Time from "../../assets/png/time.svg"
import Insights from "../../assets/png/insight.svg"
import Notification from "../../assets/png/notification.svg"
import NotificationB from "../../assets/png/notification-b.svg"

const Scribe = () => {
    const [transcription, setTranscription] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [transcript, setTranscript] = useState('')


    const socket = useRef(null)
    const recorder = useRef(null)

    const generateTranscript = async() => {
        const response = await fetch('http://localhost:8000/token');
        const data = await response.json();
    
        if(data.error){
          alert(data.error)
        }
          
        const { token } = data;
      
        socket.current = await new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`);
      
        const texts = {};
        socket.current.onmessage = (voicePrompt) => {
          let msg = '';
          const res = JSON.parse(voicePrompt.data);
          texts[res.audio_start] = res.text;
          const keys = Object.keys(texts);
          keys.sort((a, b) => a - b);
          for (const key of keys) {
            if (texts[key]) {
              msg += ` ${texts[key]}` 
              console.log(msg)
            }
          }
          setTranscript(msg)
        };
      
        socket.current.onerror = (event) => {
          console.error(event);
          socket.current.close();
        }
        
        socket.current.onclose = event => {
          console.log(event);
          socket.current = null;
        }
      
        socket.current.onopen = () => {
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                recorder.current = new RecordRTC(stream, {
                type: 'audio',
                mimeType: 'audio/webm;codecs=pcm', 
                recorderType: RecordRTC.StereoAudioRecorder,
                timeSlice: 250, 
                desiredSampRate: 16000,
                numberOfAudioChannels: 1, 
                bufferSize: 4096,
                audioBitsPerSecond: 128000,
                ondataavailable: (blob) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const base64data = reader.result;
                    if (socket.current) {
                      socket.current.send(JSON.stringify({ audio_data: base64data.split('base64,')[1] }));
                    }
                  };
                  reader.readAsDataURL(blob);
                },
              });
              recorder.current.startRecording();
            })
            .catch((err) => console.error(err));
        };
        
        setIsRecording(true) 
      }
    
      const endTranscription = async (event) => {
        event.preventDefault();
        setIsRecording(false) 
    
        socket.current.send(JSON.stringify({terminate_session: true}));
        socket.current.close();
        console.log(prompt)
        socket.current = null;
    
        recorder.current.pauseRecording();
        recorder.current = null;
      }
    
    console.log(transcript, "transcript")
  

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
                    <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={endTranscription}>
                        <p className='text-[#fff] '>Stop recording</p>
                    </button>
                ):(
                        <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={generateTranscript}>
                            <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Voxscribe"}</p>
                        </button>
                    )
                }
                        
                    </div>
                    <textarea
                        type="text"
                        value={transcript}
                        className='w-full border border-[#ccc] h-[250px] p-4 font-poppins rounded-lg'
                    ></textarea>

                    
                </div>

                <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[28px]'>VoxScribe: Your Audio Transcription Powerhouse for PR</p>
                
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

            <div className='xl:flex flex-col mt-10 hidden xl:mt-0 gap-[32px]'>
                <div className='flex flex-col  xl:w-[600px] gap-2 '>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Get Audio Transcription Now</p>
                </div>
                <div className='flex flex-col items-center gap-4'>
                {isRecording ? (
                    <button className='w-full text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={endTranscription}>
                        <p className='text-[#fff] '>Stop recording</p>
                    </button>
                ):(
                    <button className='w-full text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={generateTranscript}>
                        <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Voxscribe"}</p>
                    </button>
                    )
                }

                </div>

                <textarea
                    type="text"
                    value={transcript}
                    className='w-full border border-[#ccc] h-[250px] p-4 font-poppins rounded-lg'
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
  )
}

export default Scribe