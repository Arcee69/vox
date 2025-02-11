import React, { useState } from 'react'

import { Form, Formik } from 'formik';
import { CgSpinner } from 'react-icons/cg';
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';

import { api } from '../../services/api';
import { appUrls } from '../../services/urls';


const ForgotPassword = ({ handleClose }) => {
    const [loading, setLoading] = useState(false)

    const submitForm = async (values, action) => {
        setLoading(true)
        const data = {
            "email": values?.email,
        }
        try {
          const res =  await api.post(appUrls?.FORGOTPASSWORD_URL, data)
          console.log(res, "pricy")
          setLoading(false) 
          toast(`${res.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
          })  
          handleClose()
        } catch (err)  {
          console.log(err, "err")
          setLoading(false)
          toast(`${err.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
          })  
        }
    }


  return (
    <div className='bg-[#fff] mt-[100px] h-[280px] w-full py-5 xl:w-[500px] px-5 '>
        <div className='flex justify-end cursor-pointer' onClick={handleClose}>
            <IoClose className='text-lg'/>
        </div>
        <div className='w-full'>
            <Formik
                initialValues={{
                    email: "",
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
                        <p className='text-[#19373E] font-inter font-medium text-[24px] text-center'>Forgot Password</p>

                        <div className='w-full xl:w-[450px] flex flex-col gap-2'>
                        <input 
                            name="email"
                            placeholder="Email"
                            type='text'
                            onChange={handleChange}
                            className='w-full  h-[48px] outline-none rounded-lg border border-[#8F8F8F] p-2.5'
                        />
                        </div>


                        <button
                            className="w-full font-inter flex items-center justify-center mt-[16px] h-[46px] bg-[#000] text-lg rounded text-center"
                            type="submit"
                            disabled={loading}
                        >
                            <p className='text-WHITE-_100 text-sm font-semibold'>{loading ? <CgSpinner className=" animate-spin text-xl " /> : 'Submit'}</p>
                        </button>

                    
                    </div>

                </Form>
            )}
            </Formik>
        </div>
    

  </div>
  )
}

export default ForgotPassword