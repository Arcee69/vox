import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';
import { AssemblyAI } from 'assemblyai'

import Monitor from "../../assets/svg/monitor.svg"
import Chart from "../../assets/svg/chart.svg"
import Data from "../../assets/svg/data.svg"
import Reputation from "../../assets/svg/reputation.svg"
import Record from "../../assets/png/record.svg"
import Close from "../../assets/svg/closeIcon.svg"

import Over from "../../assets/png/VoxOver.png"

import Upload from "../../assets/png/upload.png"
import Shake from "../../assets/png/shake.png"

import Time from "../../assets/png/time-b.png"
import Insights from "../../assets/png/insight.svg"
import Notification from "../../assets/png/notification.png"
import NotificationB from "../../assets/png/notification-b.png"
import ModalPop from '../../components/modalPop';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';


import Listen from "../../assets/png/listen.jpg"
import RequestForm from '../Insight/RequestForm';
import { isObjectEmpty } from '../../utils/CheckLoginData';
import { Listbox, Transition } from '@headlessui/react';
import { IoIosArrowDown } from 'react-icons/io';

const language = [
    {name:"", value:""},
    {name:"Spanish", value:"es"},
    // {name: "German", value: "de"},
    // {name: "French", value: "fr"},
    // {name: "English", value: "en"},
]

const Translate = () => {
    const [languageSelected, setLanguageSelected] = useState(language[0]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const [dubbingId, setDubbingId] = useState("")
    const [voices, setVoices] = useState([])
    const [selectedVoice, setSelectedVoice] = useState("")
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);

    const audioRef = useRef();



    console.log(dubbingId, "dubbingId")
    console.log(languageSelected, "languageSelected")

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      };

    
    const getVoices = async () => {
        try {
            const res = await axios.get("https://api.elevenlabs.io/v1/voices", {
                headers: {
                    'xi-api-key': "sk_c1ad50cb7d0cdae583d7edc38d926fa53c9fb0cd880f6d21" //"3392b41099e1bfc55980e42d6af4b040"
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

     // Start recording
    //  const startRecording = () => {
    //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //         navigator.mediaDevices.getUserMedia({ audio: true })
    //             .then(stream => {
    //                 const recorder = new MediaRecorder(stream);
    //                 setMediaRecorder(recorder);
    //                 recorder.start();
    //                 setIsRecording(true);

    //                 recorder.ondataavailable = (e) => {
    //                     setAudioChunks(prev => [...prev, e.data]);
    //                 };

    //                 recorder.onstop = () => {
    //                     const blob = new Blob(audioChunks, { type: 'audio/wav' });
    //                     const url = URL.createObjectURL(blob);
    //                     console.log(url, blob, "mask")
    //                     setAudioUrl(url);
    //                     setFile(blob); 
    //                 };
    //             }).catch(err => {
    //                 console.error("Recording error:", err);
    //             });
    //     }
    // };

      // Stop recording
    //   const stopRecording = () => {
    //     if (mediaRecorder) {
    //         mediaRecorder.stop();
    //         setIsRecording(false);
    //     }
    // };

    // Start recording
    const startRecording = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    const recorder = new MediaRecorder(stream);
                    setMediaRecorder(recorder);
                    
                    // Clear previous chunks
                    setAudioChunks([]); 
    
                    recorder.start();
                    setIsRecording(true);
    
                    recorder.ondataavailable = (e) => {
                        setAudioChunks(prev => [...prev, e.data]);
                    };

                    recorder.onstop = () => {
                        setTimeout(() => {
                            if (audioChunks.length > 0) {
                                const blob = new Blob(audioChunks, { type: 'audio/wav' });
                                const url = URL.createObjectURL(blob);
                                console.log(url, blob, "mask");
                                setAudioUrl(url);
                                setFile(blob);
                            } else {
                                console.error('No audio data available.');
                            }
                        }, 100); // Add a small delay to ensure all chunks are processed
                    };
                    
    
                    // recorder.onstop = () => {
                    //     // Ensure the data is collected properly after stop
                    //     if (audioChunks.length > 0) {
                    //         const blob = new Blob(audioChunks, { type: 'audio/wav' });
                    //         const url = URL.createObjectURL(blob);
                    //         setAudioUrl(url);
                    //         setFile(blob);
                    //     } else {
                    //         console.error('No audio data available.');
                    //     }
                    // };
                })
                .catch(err => {
                    console.error("Recording error:", err);
                });
        }
    };
    

// Stop recording
const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        setIsRecording(false);
    }
};



    const handleVoiceChange = (e) => {
        const selectedVoice = e.target.value;
        setSelectedVoice(selectedVoice);
    };

    const submitForm = async () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("audio", file);
        formData.append("voice_id", selectedVoice);
        formData.append("model_id", "eleven_english_sts_v2");
        formData.append("optimize_streaming_latency", "4");
        formData.append("output_format", "mp3");
        
        try {
            const res = await axios.post(`https://api.elevenlabs.io/v1/speech-to-speech/${selectedVoice}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'xi-api-key': "sk_c1ad50cb7d0cdae583d7edc38d926fa53c9fb0cd880f6d21"   //"3392b41099e1bfc55980e42d6af4b040"
                },
                responseType: 'blob' 
            });
            console.log(res, "audioT");

         
            const blob = new Blob([res.data], { type: 'audio/mpeg' });
    
            
            const link = document.createElement('a');
    
            link.href = window.URL.createObjectURL(blob);
            link.download = `audio_translated.mp3`;
    
            document.body.appendChild(link);
            
            link.click();
            
            document.body.removeChild(link);

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error("Error fetching voices:", error);
        }
    }


    const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")))

    console.log(isAuthed, "isAuthed")

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
    <div className=' mt-10 lg:mt-0 '>
        <div 
            style={{
                backgroundImage: `url(${Over})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                position: "relative",
            }}
            className='h-[676px] flex flex-col items-center gap-3 lg:gap-5 justify-center px-5 lg:px-0'
        >
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <div className='relative z-10 flex flex-col gap-5 items-center'>
                <p className='font-satoshi font-bold text-[40px] lg:text-[64px] text-[#fff]'>VoxOver</p>
                <p className='font-satoshi text-[24px] lg:text-[32px] w-full lg:w-[412px] text-[#fff] text-center'>
                    Add the power of your voice to your content today
                </p>
                <div className='flex flex-col lg:mx-auto  bg-[#FAF1ED] rounded-xl items-center lg:w-[491px] h-auto px-6 py-[28px]  gap-[16px]'>
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
                                            accept='audio/*'
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <div className='flex gap-1.5 items-center'>
                                        <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                        <p className='text-xs font-inter font-semibold text-[#98A2B3]'>OR</p>
                                        <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                    </div>

                                    {  
                                        audioUrl ? 
                                            <div className='flex flex-col relative gap-1'>
                                                <audio ref={audioRef} src={audioUrl} controls />
                                                <img 
                                                    src={Close} 
                                                    alt='Close' 
                                                    className='w-[10px] h-[10px] absolute -right-2' 
                                                    onClick={() => {setAudioUrl(null), setAudioChunks([])}} />
                                                
                                            </div> 
                                            :
                                            <div className='flex flex-col items-center gap-[16px]'>
                                                {!isRecording ? (
                                                    <button onClick={startRecording} className='bg-[#FF6600] flex items-center justify-center gap-[4px] rounded-xl w-[123px] h-[28px]'>
                                                        <img src={Record} alt='Record' className='w-3 h-3' />
                                                        <p className='text-[#fff] font-bold font-satoshi text-xs'>Record audio</p>
                                                    </button>
                                                ) : (
                                                    <button onClick={stopRecording} className='bg-[#FF6600] flex items-center justify-center gap-[4px] rounded-xl w-[123px] h-[28px]'>
                                                        <p className='text-[#fff] font-bold font-satoshi text-xs'>Stop Recording</p>
                                                    </button>
                                                )}
                                            </div>
                                    }

                                    {/* <button
                                        type='button'
                                        className='bg-[#FF6600] flex items-center justify-center gap-[4px] rounded-xl w-[123px] h-[28px]'
                                    >
                                        <img src={Record} alt='Record' className='w-3 h-3' />
                                        <p className='text-[#fff] font-bold font-satoshi text-xs'>Record audio</p>
                                    </button> */}

                                </div>
                        }
                        
                    </div>
                </div>
                <select onChange={handleVoiceChange} className='w-full  lg:w-[491px] p-2 outline-none border border-[#ccc] rounded-lg'>
                    <option value="">Select a voice</option>
                    {voices?.map((voice, index) => (
                        <option key={index} value={voice?.voice_id}>{voice?.name}</option>
                    ))}
                </select>
                <button className='w-full  lg:w-[491px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={() => showModal()}> {/*{textDeepgram} */}
                    <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Over"}</p>
                </button>
            </div>
        </div>
        <div className='w-full lg:mb-[118px] mt-[92px] lg:mx-[80px]'>
            <div className='bg-gradient-to-r from-[#070014] to-[#1E1433] py-[77px] px-5 lg:px-[80px] rounded-[40px] h-auto w-full lg:w-11/12 flex flex-col gap-6 lg:gap-[56px]'>
                <div className='flex flex-col gap-3 lg:gap-0'>
                    <p className='text-[#fff] font-bold font-satoshi text-[28px] leading-[28px]  lg:text-[48px]'>Your Voice, Your Style: Shape It with VoxOver</p>
                    <p className='text-[#fff] font-medium text-[18px] lg:text-[40px] font-satoshi'>How VoxOver works</p>
                </div>
                <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-[56px]'>
                    <img src={Shake} alt='Shake' className='w-full lg:w-[532px] h-auto' />
                    <div className='flex flex-col gap-6 lg:gap-[56px]'>
                        <div className='flex flex-col lg:flex-row items-start gap-6 lg:gap-[56px]'>
                            <div className='flex flex-col w-full lg:w-[238px] gap-6'>
                                <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                                <p className='text-[#fff] text-[24px]'>Upload or Record</p>
                                <p className='font-medium  text-base text-[#fff]'>
                                    Easily drag in your audio file or record your message directly on the platform.
                                </p>
                            </div>
                            <div className='flex flex-col w-full lg:w-[238px] gap-6'>
                                <img src={Chart} alt='Chart' className='w-6 h-6'/>
                                <p className='text-[#fff] text-[24px]'>Choose Your Style</p>
                                <p className='font-medium text-base text-[#fff]'>
                                    Select a voice that reflects your message and adjust the tone, speed, 
                                    and delivery to perfection.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col w-full lg:w-[238px] gap-6'>
                            <img src={Data} alt='Data' className='w-6 h-6'/>
                            <p className='text-[#fff]  text-[24px]'>Download & Share</p>
                            <p className='font-medium  text-base text-[#fff]'>
                                Once you're happy with your new voice, 
                                download it and share it across all your channels.
                            </p>
                        </div>
                        <button
                            type='button'
                            className='w-[200px] h-[54px] rounded-[24px] bg-[#FF6600] flex items-center justify-center'
                        >
                            <p className='font-satoshi text-[#fff] text-[20px] font-medium'>Use VoxOver</p>
                        </button>
                    </div>
                </div>
            </div>

        </div>

        <div className='mt-[60px] mb-[115px] flex w-full'>
            <div className='w-10/12 mx-auto flex flex-col gap-[32px] '>
                <p className='text-[28px] lg:text-[48px] font-satoshi font-bold text-[#1C1C1C]'>Why Choose VoxOver</p>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-[40px] lg:gap-[56px] items-center'>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>Creators</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Add variety and personality to your videos, podcasts, 
                            and social posts without the need for re-recording.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Chart} alt='Chart' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>Educators</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Transform your lessons and make learning more engaging by adjusting the 
                            delivery to captivate your students.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Data} alt='Data' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold font-satoshi text-[20px] lg:text-[24px]'>Businesses</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Fine-tune customer-facing audio for ads, presentations, 
                            or customer support to match your brand’s vibe.
                        </p>
                    </div>
                    <div className='flex flex-col items-start gap-6 w-full lg:w-[278px]'>
                        <img src={Reputation} alt='Reputation' className='w-6 h-6'/>
                        <p className='text-[#1C1C1C] font-bold  font-satoshi text-[20px] lg:text-[24px]'>Media Professionals</p>
                        <p className='font-normal font-satoshi text-[#363637]'>
                            Quickly adjust narration and voiceovers to meet project demands with minimal effort.
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
                    Whether you’re educating, entertaining, or promoting, 
                    VoxSpeak helps you craft a voice that truly connects.
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

    </div>
  )
}

export default Translate