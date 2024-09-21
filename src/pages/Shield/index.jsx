import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';

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


const Shield = () => {
    const [loading, setLoading] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [openLogin, setOpenLogin] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const [text, setText] = useState("")

    const token = import.meta.env.VITE_APP_PROMPT_API_PUBLIC_KEY


    const submitForm = async () => {
        // setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Basic ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "start_node_id": "7rwO-start",
        "end_node_id": "zyZl-end",
        "result_node_id": "zyZl-end",
        "node_settings": {
            "7rwO-start": {
            "data": {
                "task": text
            }
            }
        }
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        // await axios.post("https://api.scade.pro/api/v1/scade/flow/37209/execute", raw, {
        //     headers: {
        //         "Authorization": `Basic ${token}`,
        //         "Content-Type": "application/json"
        //     }
        // })
        // .then((res) => {
        //     console.log(res);
        // })
        // .catch((err) => {
        //     console.error('Axios error:', err);
        // });
        

        fetch("https://api.scade.pro/api/v1/scade/flow/37209/execute", requestOptions)
        .then(response => response.json())
        .then((result) => 
            console.log(result)
        )
        .catch(error => console.error('Fetch error:', error));


        // await axios.post("https://api.scade.pro/api/v1/scade/flow/37209/execute", raw, {
        //     headers: {
        //         "Authorization": `Basic ${token}`,
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Methods": "*",
        //         "Mode": "no-cors"
        //     }
        // })

        
        // .then((res) => {
        //     console.log(res, "appa")
        //     setLoading(false)
        //     toast(`File Uploaded Successfully`, {
        //         position: "top-right",
        //         autoClose: 5000,
        //         closeOnClick: true,
        //     })   
        // })
        // .catch((err) => {
        //     console.log(err, "zuko")
        //     setLoading(false)
        //     toast(`Error`, {
        //         position: "top-right",
        //         autoClose: 5000,
        //         closeOnClick: true,
        //     }) 
        // })
    }

   




    const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")))

    console.log(isAuthed, "isAuthed")

    const showModal = () => {
        if(!isAuthed) {
            window.location.href = "https://preview--truth-shield.gptengineer.run"
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
                        <p className='text-[#17053E] text-[22px] font-poppins font-medium'>
                            Unlock state-of-the-art, tailored prompts that supercharge your AI’s output like never before. 
                            VoxShield is designed to transform ordinary inputs into extraordinary results, ensuring your content 
                            is more accurate, engaging, and impactful. Whether you're crafting stories, data analysis, or 
                            business insights, VoxPrompt gives you the cutting edge.
                        </p>
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        {/* <input 
                            type="text" 
                            onChange={(e) => setText(e.target.value)} 
                            value={text}
                            placeholder='Shield'
                            className='border border-[#ccc] outline-none xl:w-[371px] p-2'
                        /> */}
                   
                        <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={() => run()}>
                            <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Shield"}</p>
                        </button>
                    </div>

                    <img src={Listen} alt='Listen' className='xl:w-[600px]'/>
                </div>

                <p className='w-full text-center xl:text-left xl:w-[450px] text-[#17053E] text-[28px]'> AI Prompting Made Easy with VoxShield: Precision at Your Fingertips</p>
                
                <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
                    Experience the Future of AI-Driven Content Creation
                    With VoxPrompt, you don’t just generate prompts – you create brilliance.
                </p>

                <p className='font-medium text-[#8F899C]  xl:w-[458px]'>
                    Why Choose VoxPrompt?
                </p>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Monitor} alt='Monitor' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Effortless Precision:</p>
                    <p className='font-medium text-[#8F899C]'>
                        Create precise, context-driven prompts that generate superior results.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Chart} alt='Chart' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Boost Creativity:</p>
                    <p className='font-medium text-[#8F899C]'>
                        Elevate your AI-generated content with unparalleled quality and clarity.
                    </p>
                </div>

                <div className='flex flex-col gap-4 xl:w-[458px]'>
                    <img src={Data} alt='Data' className='w-6 h-6'/>
                    <p className='text-[#17053E] text-[24px]'>Seamless Integration: </p>
                    <p className='font-medium text-[#8F899C]'>
                        A powerful byproduct of VoxPR, seamlessly fitting into your workflow.
                    </p>
                </div>

                
            </div>

            <div className='xl:flex flex-col mt-10 hidden xl:mt-0 gap-[32px]'>
                <div className='flex flex-col  xl:w-[600px] gap-2 xl:p-4'>
                    {/* <p className='text-[#17053E] text-[22px] font-poppins font-medium'>Upload your audio or video file and start analyzing</p> */}
                    <p className='text-[#17053E] text-[22px] font-poppins font-medium'>
                        Unlock state-of-the-art, tailored prompts that supercharge your AI’s output like never before. 
                        VoxShield is designed to transform ordinary inputs into extraordinary results, ensuring your content 
                        is more accurate, engaging, and impactful. Whether you're crafting stories, data analysis, or 
                        business insights, VoxShield gives you the cutting edge.
                    </p>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    {/* <input 
                        type="text" 
                        onChange={(e) => setText(e.target.value)} 
                        value={text}
                        placeholder='Shield'
                        className='border border-[#ccc] xl:w-[371px] outline-none p-2'
                    /> */}
                   
                    <button className='w-full xl:w-[371px] text-[#fff] rounded-lg flex items-center justify-center bg-[#17053E] p-4' onClick={() => showModal()}> {/*{textDeepgram} */}
                        <p className='text-[#fff] '>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Use Vox Shield"}</p>
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

export default Shield