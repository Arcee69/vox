import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';
import { AssemblyAI } from 'assemblyai'

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
    <div className='mt-[100px] xl:mt-[45px] '>
        <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
            <div className='flex flex-col gap-[48px]'>

                <div className='flex xl:hidden flex-col mt-10 xl:mt-0 gap-[32px]'>
                    <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
                        {/* <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Upload your audio or video file and start analyzing</p> */}
                        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>VoxOver: Your Voice, Amplified</p>
                        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>
                            Let VoxOver take your brand's communication to new heights. With our feature, your messages aren't 
                            just heard—they're remembered. Add the power of voice to your content today.
                        </p>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
                        <select onChange={handleVoiceChange} className='w-full xl:w-[371px] p-2 outline-none border border-[#ccc] rounded-lg'>
                            <option value="">Select a voice</option>
                            {voices?.map((voice, index) => (
                                <option key={index} value={voice?.voice_id}>{voice?.name}</option>
                            ))}
                        </select>
                        

                        <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={() => run()}>
                            <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Over"}</p>
                        </button>
                    </div>

                    <img src={Listen} alt='Listen' className='xl:w-[600px]'/>
                </div>

                <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[28px]'>
                    VoxOver: Your Ultimate Voice Over Tool for Impactful Storytelling
                </p>

                {/* <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
                    Break language barriers with lightning-fast translations in 29 languages. 
                    VoxTranslator's cutting-edge technology delivers:
                </p> */}
                
                <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
                    Why Choose VoxOver?
                </p>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Crystal Clear Narration:</p>
                    <p className='font-medium text-[#8F899C]'>
                        Our high-quality voice-over feature ensures your message is delivered with clarity and precision, 
                        capturing your audience's attention from the first word.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Chart} alt='Chart' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Customizable Voices:</p>
                    <p className='font-medium text-[#8F899C]'>
                        Tailor the tone, style, and personality of your voice-over to match your brand's identity and message, 
                        whether you need a warm, professional, or dynamic sound.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Data} alt='Data' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Seamless Integration:</p>
                    <p className='font-medium text-[#8F899C]'>
                        Effortlessly incorporate VoxOver into your content creation process, whether it's for a video, presentation, 
                        or digital ad.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Reputation} alt='Monitor' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Enhanced Engagement:  </p>
                    <p className='font-medium text-[#8F899C]'>
                        Audio enhances user experience—VoxOver adds an extra layer of professionalism 
                        that boosts engagement and drives results.
                    </p>
                </div>

                 <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Versatile Application:</p>
                    <p className='font-medium text-[#8F899C]'>
                        From corporate narrations to dynamic product launches, VoxOver adapts to your needs, 
                        providing the perfect voice for every project.
                    </p>
                </div>

                {/* <div className='flex flex-col gap-4 xl:w-[458px]'>
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
                </div> */}

            </div>

            <div className='xl:flex flex-col mt-10 hidden xl:mt-0 gap-[32px]'>
                <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>VoxOver: Your Voice, Amplified</p>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>
                        Let VoxOver take your brand's communication to new heights. With our feature, your messages aren't 
                        just heard—they're remembered. Add the power of voice to your content today.
                    </p>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
                    <select onChange={handleVoiceChange} className='w-full xl:w-[371px] p-2 outline-none border border-[#ccc] rounded-lg'>
                            <option value="">Select a voice</option>
                            {voices?.map((voice, index) => (
                                <option key={index} value={voice?.voice_id}>{voice?.name}</option>
                        ))}
                    </select>
                    <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={() => showModal()}> {/*{textDeepgram} */}
                        <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Over"}</p>

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



{/* <Listbox value={languageSelected} onChange={setLanguageSelected}>
<div className="relative">
    <Listbox.Button className="outline-none w-full xl:w-[371px] flex items-center justify-between  rounded-lg bg-[#fff] border  border-[#BABABA] p-3 h-[48px] border-solid">
        <span className="block truncate w-full text-left text-[#222222] font-medium  font-mont">  {languageSelected.name || 'Select a language'}</span>
        {/* <span className="pointer-events-none absolute inset-y-0 right-0 pr-2 lg:-right-6 flex items-center"> */}
            <IoIosArrowDown
                className="h-5 w-5 text-[#AAAAAA] "
                aria-hidden="true"
            />
        {/* </span> 
    </Listbox.Button>
    <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
    >
        <Listbox.Options className="absolute z-10 mt-1 w-[300px] max-h-60  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {language.map((item, index) => (
                <Listbox.Option
                    key={index}
                    className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? 'bg-[#E6F6F4] text-[#052011]' : 'text-[#052011]'
                        }`
                    }
                    value={item}
                >
                {({ selected }) => (
                    <>
                        <span
                            className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                            } text-[#052011]`}
                            // onChange={() => setFieldValue("gender", item?.name)}
                        >
                            {item.name}
                        </span>
                    </>
                )}
                </Listbox.Option>
            ))}
        </Listbox.Options>
    </Transition>
</div>
</Listbox> */}