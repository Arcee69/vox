import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';
import { AssemblyAI } from 'assemblyai'

import Monitor from "../../assets/svg/monitor.svg"
import Chart from "../../assets/svg/chart.svg"
import Data from "../../assets/svg/data.svg"
import Reputation from "../../assets/svg/reputation.svg"
import Record from "../../assets/png/record.svg"

import Over from "../../assets/png/VoxOver.png"

import Upload from "../../assets/png/upload.png"
import Shake from "../../assets/png/shake.png"

// import Time from "../../assets/png/time.svg"
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
    const [translatedAudio, setTranslatedAudio] = useState(null)



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

    // const submitForm = async () => {



    //     setLoading(true)
    //     const formData = new FormData();
    //     formData.append("mode", "automatic");
    //     formData.append("file", file);
    //     // formData.append("csv_file", "<string>");
    //     // formData.append("foreground_audio_file", "<string>");
    //     // formData.append("background_audio_file", "<string>");
    //     formData.append("name", "translator");
    //     // formData.append("source_url", "<string>");
    //     formData.append("source_lang", "en");
    //     formData.append("target_lang", "es");
    //     formData.append("num_speakers", "0");
    //     // formData.append("watermark", "true");
    //     // formData.append("start_time", "123");
    //     // formData.append("end_time", "123");
    //     // formData.append("highest_resolution", "true");
    //     // formData.append("dubbing_studio", "true");

    //     // const options = {method: 'POST',};

    //     // options.body = form;

    //     await axios.post('https://api.elevenlabs.io/v1/dubbing', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'xi-api-key': "3392b41099e1bfc55980e42d6af4b040" 
    //         }
    //     })
    //     .then((res) => {
    //         console.log(res, "appa")
    //         setDubbingId(res?.data?.dubbing_id)
    //         toast(`File Uploaded Successfully`, {
    //             position: "top-right",
    //             autoClose: 5000,
    //             closeOnClick: true,
    //         })   
    //     })
    //     .catch((err) => {
    //         console.log(err, "zuko")
    //         toast(`Error`, {
    //             position: "top-right",
    //             autoClose: 5000,
    //             closeOnClick: true,
    //         }) 
    //     })
    // }

    // const getFile = async () => {
    //         try {
    //             const res = await axios.get(`https://api.elevenlabs.io/v1/dubbing/${dubbingId}/audio/${languageSelected?.value || "es"}`, {
    //                 headers: {
    //                     'xi-api-key': "3392b41099e1bfc55980e42d6af4b040"
    //                 },
    //                 responseType: 'blob' // Important to handle the binary data correctly
    //             });
    //             console.log(res?.data, "res");

    //               // Create a blob from the response data
    //             const blob = new Blob([res.data], { type: 'audio/mpeg' });
        
    //             // Create a link element
    //             const link = document.createElement('a');
        
    //             // Set the download attribute with a filename
    //             link.href = window.URL.createObjectURL(blob);
    //             link.download = `audio_${dubbingId}.mp3`;
        
    //             // Append the link to the body
    //             document.body.appendChild(link);
                
    //             // Programmatically click the link to trigger the download
    //             link.click();
                
    //             // Remove the link from the document
    //             document.body.removeChild(link);

    //             setLoading(false)
    //             toast(`File Converted Successfully`, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 closeOnClick: true,
    //             });
    //         } catch (error) {
    //             console.error("Error fetching file:", error);
    //             setLoading(false)
    //             toast(`Error converting file: ${error.message}`, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 closeOnClick: true,
    //             });
    //         }
        
    // };

    // const checkDubbingId = () => {
    //     if(dubbingId) {
    //         setTimeout(() => {
    //             getFile()
    //         }, 70000)
    //     }
    // }

    // const lang = languageSelected.name

    // useEffect(() => {
    //     checkDubbingId()
    // }, [dubbingId, lang])


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
                backgroundRepeat: "no-repeat"
            }}
            className='h-[576px] flex flex-col items-center gap-3 lg:gap-5 justify-center px-5 lg:px-0'
        >
            <p className='font-satoshi font-bold text-[40px] lg:text-[64px] text-[#fff]'>VoxOver</p>
            <p className='font-satoshi text-[24px] lg:text-[32px] w-full lg:w-[412px] text-[#fff] text-center'>
                Add the power of your voice to your content today
            </p>
            <div className='flex flex-col lg:mx-auto  bg-[#FAF1ED] rounded-xl items-center lg:w-[491px] h-[173px] px-6 py-[28px]  gap-[16px]'>
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
                                        accept='pdf, docx'
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                </label>
                                <div className='flex gap-1.5 items-center'>
                                    <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                    <p className='text-xs font-inter font-semibold text-[#98A2B3]'>OR</p>
                                    <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                </div>
                                <button
                                    type='button'
                                    className='bg-[#FF6600] flex items-center justify-center gap-[4px] rounded-xl w-[123px] h-[28px]'
                                >
                                    <img src={Record} alt='Record' className='w-3 h-3' />
                                    <p className='text-[#fff] font-bold font-satoshi text-xs'>Record audio</p>
                                </button>
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


// <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
//             <div className='flex flex-col gap-[48px]'>

//                 <div className='flex xl:hidden flex-col mt-10 xl:mt-0 gap-[32px]'>
//                     <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
//                         <p className='text-[#17053E] text-[22px] font-poppins font-medium'>VoxOver: Your Voice, Amplified</p>
//                         <p className='text-[#17053E] text-[22px] font-poppins font-medium'>
//                             Let VoxOver take your brand's communication to new heights. With our feature, your messages aren't 
//                             just heard—they're remembered. Add the power of voice to your content today.
//                         </p>
//                     </div>
//                     <div className='flex flex-col items-center gap-4'>
//                         <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
//                         <select onChange={handleVoiceChange} className='w-full xl:w-[371px] p-2 outline-none border border-[#ccc] rounded-lg'>
//                             <option value="">Select a voice</option>
//                             {voices?.map((voice, index) => (
//                                 <option key={index} value={voice?.voice_id}>{voice?.name}</option>
//                             ))}
//                         </select>
                        

//                         <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={() => run()}>
//                             <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Over"}</p>
//                         </button>
//                     </div>

//                     <img src={Listen} alt='Listen' className='xl:w-[600px]'/>
//                 </div>

//                 <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[28px]'>
//                     VoxOver: Your Ultimate Voice Over Tool for Impactful Storytelling
//                 </p>
                
//                 <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
//                     Why Choose VoxOver?
//                 </p>

//                 <div className='flex flex-col gap-4 xl:w-[458px]'>
//                     <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
//                     <p className='text-[#17053E] text-[24px]'>Crystal Clear Narration:</p>
//                     <p className='font-medium text-[#8F899C]'>
//                         Our high-quality voice-over feature ensures your message is delivered with clarity and precision, 
//                         capturing your audience's attention from the first word.
//                     </p>
//                 </div>

//                 <div className='flex flex-col gap-4 xl:w-[458px]'>
//                     <img src={Chart} alt='Chart' className='w-6 h-6'/>
//                     <p className='text-[#17053E] text-[24px]'>Customizable Voices:</p>
//                     <p className='font-medium text-[#8F899C]'>
//                         Tailor the tone, style, and personality of your voice-over to match your brand's identity and message, 
//                         whether you need a warm, professional, or dynamic sound.
//                     </p>
//                 </div>

//                 <div className='flex flex-col gap-4 xl:w-[458px]'>
//                     <img src={Data} alt='Data' className='w-6 h-6'/>
//                     <p className='text-[#17053E] text-[24px]'>Seamless Integration:</p>
//                     <p className='font-medium text-[#8F899C]'>
//                         Effortlessly incorporate VoxOver into your content creation process, whether it's for a video, presentation, 
//                         or digital ad.
//                     </p>
//                 </div>

//                 <div className='flex flex-col gap-4 xl:w-[458px]'>
//                     <img src={Reputation} alt='Monitor' className='w-6 h-6'/>
//                     <p className='text-[#17053E] text-[24px]'>Enhanced Engagement:  </p>
//                     <p className='font-medium text-[#8F899C]'>
//                         Audio enhances user experience—VoxOver adds an extra layer of professionalism 
//                         that boosts engagement and drives results.
//                     </p>
//                 </div>

//                  <div className='flex flex-col gap-4 xl:w-[458px]'>
//                     <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
//                     <p className='text-[#17053E] text-[24px]'>Versatile Application:</p>
//                     <p className='font-medium text-[#8F899C]'>
//                         From corporate narrations to dynamic product launches, VoxOver adapts to your needs, 
//                         providing the perfect voice for every project.
//                     </p>
//                 </div>

         

//             </div>

//             <div className='xl:flex flex-col mt-10 hidden xl:mt-0 gap-[32px]'>
//                 <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
//                     <p className='text-[#17053E] text-[22px] font-poppins font-medium'>VoxOver: Your Voice, Amplified</p>
//                     <p className='text-[#17053E] text-[22px] font-poppins font-medium'>
//                         Let VoxOver take your brand's communication to new heights. With our feature, your messages aren't 
//                         just heard—they're remembered. Add the power of voice to your content today.
//                     </p>
//                 </div>
//                 <div className='flex flex-col items-center gap-4'>
//                     <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
//                     <select onChange={handleVoiceChange} className='w-full xl:w-[371px] p-2 outline-none border border-[#ccc] rounded-lg'>
//                             <option value="">Select a voice</option>
//                             {voices?.map((voice, index) => (
//                                 <option key={index} value={voice?.voice_id}>{voice?.name}</option>
//                         ))}
//                     </select>
//                     <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={() => showModal()}> {/*{textDeepgram} */}
//                         <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Over"}</p>

//                     </button>
//                 </div>

//                 <img src={Listen} alt='Listen' className='xl:w-[600px]'/>
//             </div>

//         </div>


//         <div className='w-full flex flex-col xl:flex-row items-center mb-10 justify-between py-10 xl:py-0 xl:h-[480px] mt-[103px] px-[20px] xl:px-[100px] bg-[#FFF7F2]'>
//             <div className='flex flex-col gap-[6px]'>
//                 <p className=' flex flex-col gap-4  xl:w-[673px]'>
//                 <p className='text-2xl xl:text-[30px] text-[#17053E] font-semibold'> How PR Pros Benefit</p>
//                 <p className='text-base'><span className='font-medium'>Crisis Management:</span> Quickly gauge public sentiment in a crisis.</p>
//                 <p className='text-base'><span className='font-medium'>Media Monitoring:</span> Track the impact of press coverage and competitor activity.</p>
//                 <p className='text-base'><span className='font-medium'>Campaign Evaluation:</span> Measure the emotional resonance of your messaging.</p>
//                 <p className='text-base'><span className='font-medium'>Stakeholder Insights:</span> Understand the true needs and concerns of your audience.</p>
//                 </p>
//                 <button type='button' className='xl:w-[371px] mt-2 rounded-lg bg-[#17053E] p-4' onClick={() => setOpenForm(true)}>
//                     <p className='text-[#fff]'>Request Free Consultation</p>
//                 </button>
//             </div>
//             <div className='flex-col relative hidden xl:flex'>
//                 <img src={Time} alt='Time' className='w-[208px]  absolute -top-24 '/>
//                 <img src={Notification} alt='Notification' className='w-[444px] left-14 -top-16 absolute ' />
//                 <img src={Insights} alt='Insights' className='w-[193px]  top-20 z-40 absolute'/>
//                 <img src={NotificationB} alt='NotificationB' className='w-[446px] left-14 top-20 relative  ' />
//             </div>
//         </div>