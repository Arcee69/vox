import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

import Help from "../../assets/svg/help_circle.svg"
import Check from "../../assets/png/check_icon.png"
import Minus from "../../assets/png/minus.png"

import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import { isObjectEmpty } from '../../utils/CheckLoginData';

import ModalPop from '../../components/modalPop';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import RequestForm from '../Insight/RequestForm';
import axios from 'axios';
import { toast } from 'react-toastify';

const Pricing = () => {
    const [amount, setAmount] = useState(0)
    const [openLogin, setOpenLogin] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openRequestForm, setOpenRequestForm] = useState(false)
    
    const navigate = useNavigate()
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const trxref = queryParams.get('trxref');
    const reference = queryParams.get('reference');

    const userData = JSON.parse(localStorage.getItem("userObj"))
    console.log(userData, "userData")

    const secret = import.meta.env.VITE_APP_SECRET_KEY


  const initializePayment = async () => {
    const data= { 
        "email": userData?.data?.email,
        "amount": `${amount}00`,
        "currency": "NGN",
        "callback_url": "https://voxprinsight.com/pricing"
    }
    await axios.post("https://api.paystack.co/transaction/initialize", data, {
        headers: {
            "Authorization": `Bearer ${secret}`,
            "Content-Type": "application/json"
        }
    })
    .then((res) => {
        console.log(res, "pablo")
        const authUrl = res?.data?.data?.authorization_url
        window.location.href = authUrl;
        localStorage.setItem("amount", amount);
    })
    .catch((err) => {
        console.log(err, "zanku")
    })
  }

    const verifyTransaction = async () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        const storedAmount = localStorage.getItem("amount")
        try {
            const res = await api.get(appUrls?.PAYMENT_URL + `?ref=${reference}&total=${storedAmount}`)
            toast(`${res?.data?.message}`, { 
                position: "top-right",
                autoClose: 3500,
                closeOnClick: true,
            });
            localStorage.removeItem("amount")
            navigate("/pricing", { replace: true })
        } catch (error) {
            console.log(error, "err")
        }
   
      }

  const isAuthed = isObjectEmpty(JSON.parse(localStorage.getItem("userObj")))

  console.log(isAuthed, "isAuthed")

  const showModal = () => {
    if(!isAuthed) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1500)
      initializePayment()
    } else {
      setOpenLogin(true)
    }
  }

  const showOpenSignUpModal = () => {
    setOpenLogin(false)
    setOpenSignUp(true)  
}

 useEffect(() => {
    verifyTransaction()
 }, [reference])

  return (
    <div className='mt-[100px] xl:mt-[45px] flex flex-col items-center xl:mb-[40px]'>
        <div className='flex flex-col items-center w-8/12 mx-auto'>
            <p className='text-[#3B3F5C] text-[48px] font-medium font-poppins'>Pricing</p>
            <p className='text-base text-[#3B3F5C] text-center font-poppins'>
                Enjoy a free access to our VoxPR tools for the first 2 days when you sign up and subscribe 
                to any of our flexible plans Our pricing allows you to do more while spending less. 
                Cancel at any time. No contracts.
            </p>
        </div>

        <div className='flex flex-col w-[100%] overflow-auto lg:w-10/12  mt-[60px]'>
            <div className='w-full flex items-center '>
                <div className='w-[265px] h-[306px] flex flex-col px-3 gap-3'>

                </div>
                <div className='w-[265px] h-[306px] flex flex-col px-3 gap-3'>
                    <p className='text-[#101828] font-semibold font-poppins text-[20px]'>Monthly</p>
                    <hr/>
                    <p className='font-semibold text-[#101828] font-poppins text-[40px]'>₦10,000</p>
                    <p className='text-[#3B3F5C] font-poppins'>
                        Basic features for up to 10 employees with everything you need.
                    </p>
                </div>
                <div className='w-[265px] h-[306px] flex flex-col px-3 gap-3'>
                    <div className='flex items-center gap-1'>
                        <p className='text-[#101828] font-semibold font-poppins text-[20px]'>Yearly</p>
                        <div className='w-[72px] h-[24px] bg-[#F4DCD3] rounded-2xl flex items-center justify-center p-2'>
                            <p className='text-[#FF6600] font-medium text-sm '>Popular</p>
                        </div>
                    </div>
                    <hr/>
                    <p className='font-semibold text-[#101828] font-poppins text-[40px]'>₦100,000</p>
                    <p className='text-[#3B3F5C] font-poppins'>
                        Advanced features and reporting, better workflows and automation.
                    </p>
                </div>
                <div className='w-[265px] h-[306px] flex flex-col px-3 gap-3'>
                    <p className='text-[#101828] font-semibold font-poppins text-[20px]'>Enterprise</p>
                    <hr/>
                    <p className='font-semibold text-[#101828] font-poppins text-[30px]'>Custom Quote</p>
                    <p className='text-[#3B3F5C] font-poppins'>
                        Personalised service and enterprise security for large teams.
                    </p>
                </div>

            </div>
            <div className='flex flex-col gap-4 px-5'>
                <div className='w-full'>
                    <p className='font-inter font-medium text-[#FF6600]'>Features</p>
                </div>
                <div className='flex flex-col'>
                    <div className='bg-[#fff] w-[150%] lg:w-full h-[64px] p-2 flex items-center'>
                        <div className='flex items-center gap-1.5 w-[265px]'>
                            <p className='font-medium font-poppins'>Vox Speak</p>
                            <img src={Help} alt='Help' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                    </div>
                    <div className='bg-transparent w-[150%] lg:w-full h-[64px] p-2 flex items-center'>
                        <div className='flex items-center gap-1.5 w-[265px]'>
                            <p className='font-medium font-poppins'>VoxScribe</p>
                            <img src={Help} alt='Help' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <p className='font-normal text-[#667085] font-poppins'>10</p>
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <p className='font-normal text-[#667085] font-poppins'>20</p>
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <p className='font-normal text-[#667085] font-poppins'>Unlimited</p>
                        </div>
                    </div>
                    <div className='bg-[#fff] w-[150%] lg:w-full h-[64px] p-2 flex items-center'>
                        <div className='flex items-center gap-1.5 w-[265px]'>
                            <p className='font-medium font-poppins'>Vox Release</p>
                            <img src={Help} alt='Help' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <p className='font-normal text-[#667085] font-poppins'>20GB</p>
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <p className='font-normal text-[#667085] font-poppins'>40GB</p>
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <p className='font-normal text-[#667085] font-poppins'>Unlimited</p>
                        </div>
                    </div>
                    <div className='bg-transparent w-[150%] lg:w-full h-[64px] p-2 flex items-center'>
                        <div className='flex items-center gap-1.5 w-[265px]'>
                            <p className='font-medium font-poppins'>Vox Sentiment</p>
                            <img src={Help} alt='Help' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                    </div>
                    <div className='bg-[#fff] w-[150%] lg:w-full h-[64px] p-2 flex items-center'>
                        <div className='flex items-center gap-1.5 w-[265px]'>
                            <p className='font-medium font-poppins'>Vox Over</p>
                            <img src={Help} alt='Help' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                    </div>
                    <div className='bg-transparent w-[150%] lg:w-full h-[64px] p-2 flex items-center'>
                        <div className='flex items-center gap-1.5 w-[265px]'>
                            <p className='font-medium font-poppins'>Vox Shield</p>
                            <img src={Help} alt='Help' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                    </div>
                    <div className=' bg-[#fff] w-[150%] lg:w-full h-[64px] p-2 flex items-center'>
                        <div className='flex items-center gap-1.5 w-[265px]'>
                            <p className='font-medium font-poppins'>Customer Support</p>
                            <img src={Help} alt='Help' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Minus} alt='Minus' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                    </div>
                    <div className='bg-transparent w-[150%] lg:w-full h-[64px] p-2 flex items-center'>
                        <div className='flex items-center gap-1.5 w-[265px]'>
                            <p className='font-medium font-poppins'>Product updates</p>
                            <img src={Help} alt='Help' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Minus} alt='Minus' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                    </div>
                    <div className='bg-[#fff] w-[150%] lg:w-full h-[64px] p-2 flex items-center'>
                        <div className='flex items-center gap-1.5 w-[265px]'>
                            <p className='font-medium font-poppins'>Secure Data Storage</p>
                            <img src={Help} alt='Help' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Minus} alt='Minus' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                    </div>
                    <div className='bg-transparent w-[150%] lg:w-full h-[64px] p-2 flex items-center'>
                        <div className='flex items-center gap-1.5 w-[265px]'>
                            <p className='font-medium font-poppins'>Knowledge base training</p>
                            <img src={Help} alt='Help' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Minus} alt='Minus' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <img src={Check} alt='Check' className='w-6 h-6' />
                        </div>
                    </div>
                    <div className='bg-transparent w-[150%] lg:w-full h-[64px] p-2 flex items-center'>
                        <div className='flex items-center gap-1.5 w-[265px]'>

                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <button
                                className='w-[217px] rounded-lg flex items-center justify-center h-[40px] bg-[#FF6600]'
                                onClick={() => {showModal(); setAmount(10000)}}
                            >
                                <p className='text-[#fff] font-inter font-medium text-sm'>Get Started</p>
                            </button>
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <button
                                className='w-[217px] rounded-lg flex items-center justify-center h-[40px] bg-[#FF6600]'
                                onClick={() => {showModal(); setAmount(100000)}}
                            >
                                <p className='text-[#fff] font-inter font-medium text-sm'>Get Started</p>
                            </button>
                        </div>
                        <div className='flex items-center justify-center w-[265px]'>
                            <button
                                className='w-[217px] rounded-lg flex items-center justify-center h-[40px] bg-[#FF6600]'
                                onClick={() => setOpenRequestForm(true)}
                                type='button'
                            >
                                <p className='text-[#fff] font-inter font-medium text-sm'>Contact Us</p>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>

        <ModalPop isOpen={openLogin}>
            <Login handleClose={() => setOpenLogin(false)} showOpenSignUpModal={showOpenSignUpModal}/>
        </ModalPop>

        <ModalPop isOpen={openRequestForm}>
            <RequestForm  handleClose={() => setOpenRequestForm(false)}/>
        </ModalPop>

        <ModalPop isOpen={openSignUp}>
            <SignUp handleClose={() => setOpenSignUp(false)}/>
        </ModalPop>
    </div>
  )
}

export default Pricing