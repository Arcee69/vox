import React, { useState } from 'react'

import { Form, Formik } from 'formik';
import { CgSpinner } from 'react-icons/cg';
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import PasswordField from '../../components/PasswordField';

const Login = ({ handleClose, showOpenSignUpModal }) => {
    const [loading, setLoading] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)

    const navigate = useNavigate()

    const submitForm = async (values, action) => {
        setLoading(true)
        const data = {
            "email": values?.email,
            "password": values?.password
        }
        await api.post(appUrls?.LOGIN_URL, data)
        .then((res) => {
          setLoading(false)
          console.log(res, "res")
          if (res?.status === 200) {
            const { token, ...newObject } = res?.data;
            localStorage.setItem("token", token);
            localStorage.setItem("userObj", JSON.stringify(newObject));
            toast("Login Successfully", {  //`${res?.data?.status}`
                position: "top-right",
                autoClose: 3500,
                closeOnClick: true,
            });
        }    
          handleClose()
          navigate("/solutions")
        })
        .catch((err) => {
          console.log(err, "err")
          setLoading(false)
          toast(`${err.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
          })  
          handleClose()
        })
    }

  
    return (
      <div className='bg-[#fff] mt-[100px] h-[380px] w-full py-5 xl:w-[500px] px-5 '>
        <div className='flex justify-end cursor-pointer' onClick={handleClose}>
          <IoClose className='text-lg'/>
        </div>
        <div className=' w-full '>
          <Formik
            initialValues={{
                email: "",
                password: ""
            }}
          // validationSchema={formValidationSchema}
              onSubmit={(values, action) => {
              window.scrollTo(0, 0);
              console.log(values, "market")
              submitForm(values, action);
          }}
          >
          {({
              handleSubmit,
              handleChange,
              dirty,
              isValid,
              setFieldValue,
              errors,
              touched,
              // setFieldTouched,
              values,
          }) => (
              <Form onSubmit={handleSubmit} className="w-full ">
                <div className="flex flex-col gap-[21px]">
                    <p className='text-[#19373E] font-inter font-medium text-[24px] text-center'>Login</p>
  
                    <div className='w-full xl:w-[450px] flex flex-col gap-2'>
                      <input 
                        name="email"
                        placeholder="Email"
                        type='text'
                        onChange={handleChange}
                        className='w-full  h-[48px] outline-none rounded-lg border border-[#8F8F8F] p-2.5'
                      />
                    </div>
  
  
                    <div className='w-full xl:w-[450px] flex flex-col gap-2'>
                        <PasswordField
                            name="password"
                            value={values.password}
                            placeholder="Password"
                            className="border w-full h-[51px] rounded-lg border-[#8F8F8F] mt-1.5"
                            onChange={handleChange}
                        />
                  </div>
  
                    <button
                        className="w-full font-inter flex items-center justify-center mt-[16px] h-[46px] bg-[#000] text-lg rounded text-center"
                        type="submit"
                        disabled={loading}
                    >
                        <p className='text-WHITE-_100 text-sm font-semibold'>{loading ? <CgSpinner className=" animate-spin text-xl " /> : 'Login'}</p>
                    </button>

                    <div className='mt-[14px]'>
                        <p className='text-xs'>Not registered yet? <span className='text-[#F7A301] text-xs font-bold cursor-pointer' onClick={() => showOpenSignUpModal()} >Create Account</span></p>
                    </div>
                </div>
  
            </Form>
          )}
          </Formik>
        </div>
        

      </div>
    )
}

export default Login