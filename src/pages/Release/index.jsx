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


const Release = () => {
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

      const client = new AssemblyAI({
        apiKey: `e2e85fbc06704e94bf249dc576d1145a` 
      })

    const audioUrl = file

    const run = async () => {
        // Step 1: Transcribe an audio file.
        const transcript = await client.transcripts.transcribe({ audio: audioUrl })
      
        // Step 2: Define a prompt to generate content.
        const prompt = 'Write a SEO-optimized article based on the audio transcript.'
      
        // Step 3: Apply LeMUR.
        const data = {
            transcript_ids: [transcript.id],
            prompt
        }
        const response = axios.post("https://api.assemblyai.com/lemur/v3/generate/task", data, {
            headers: {
                "Authorization": `e2e85fbc06704e94bf249dc576d1145a`,
                "Content-Type": 'application/json',
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin":  "https://api.assemblyai.com"
            }

        }
        )
        // const { response } = await client.lemur.task({
        //   transcript_ids: [transcript.id],
        //   prompt,
        // })
      
        console.log(response)
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
    <div className='mt-[100px] xl:mt-[45px] '>
        <div className='flex flex-col xl:flex-row justify-between px-[20px] xl:px-[100px]'>
            <div className='flex flex-col gap-[48px]'>

                <div className='flex xl:hidden flex-col mt-10 xl:mt-0 gap-[32px]'>
                    <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
                        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Get Audio Insights Now</p>
                        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Upload your audio file and start analyzing</p>
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

                <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[28px]'>VoxRelease: Effortlessly Automate Press Releases</p>
                
                <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
                    Cut through the noise and understand the true impact of your communications. Our
                    advanced AI tool analyzes audio and text to reveal sentiment, key topics, intent, and
                    streamline transcription
                </p>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>AI-Powered Generation:</p>
                    <p className='font-medium text-[#8F899C]'>
                        Transform your transcripts into professional press releases with just a click of a button
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Chart} alt='Chart' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Customization: </p>
                    <p className='font-medium text-[#8F899C]'>
                        Tone your press releases to your brand's voice and messaging.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Data} alt='Data' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Social Media Snippets: </p>
                    <p className='font-medium text-[#8F899C]'>
                        Automatically generate shareable snippets optimized for social media platforms.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Reputation} alt='Monitor' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Maximized Reach: </p>
                    <p className='font-medium text-[#8F899C]'>
                        Effectively amplify your message and gain increased engagement through expertly 
                        crafted press releases.
                    </p>
                </div>

                {/* <div className='flex flex-col gap-4 xl:w-[458px]'>
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
                </div> */}

            </div>

            <div className='xl:flex flex-col mt-10 hidden xl:mt-0 gap-[32px]'>
                <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Get Audio Insights Now</p>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Upload your audio file and start analyzing</p>
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>We accept over 40 common audio file formats including MP3, WAV, FLAC, M4A and more.</p>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <input type="file" accept='audio/*' onChange={handleFileChange} className='border border-[#ccc] xl:w-[371px] p-2'/>
                    <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={() => showModal()}> {/*{textDeepgram} */}
                        <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Release"}</p>
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

export default Release
