import React, { useState } from 'react'

import { Form, Formik } from 'formik';
import { CgSpinner } from 'react-icons/cg';
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import PasswordField from '../../components/PasswordField';

const ResetPassword = ({ handleClose  }) => {
    const [loading, setLoading] = useState(false)
   

    const navigate = useNavigate()

    const id = localStorage.getItem("id")

    const submitForm = async (values, action) => {
        setLoading(true)
        const data = {
            "user_id": `${id}`,
            "password": values?.password,
            "password_confirmation": values?.newPassword
        }
        try {
          const res =  await api.post(appUrls?.RESETPASSWORD_URL, data)
          setLoading(false)
          console.log(res, "respect")
          localStorage.removeItem("id")
          toast(`${res.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
          })  
          handleClose()
          navigate("/")
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
    <div className='bg-[#fff] mt-[100px] h-[380px] w-full py-5 xl:w-[500px] px-5 '>
        <div className='flex justify-end cursor-pointer' onClick={handleClose}>
          <IoClose className='text-lg'/>
        </div>
        <div className='w-full '>
          <Formik
            initialValues={{
                password: "",
                newPassword: ""
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
                    <p className='text-[#19373E] font-inter font-medium text-[24px] text-center'>Reset Password</p>
  
                    <div className='w-full xl:w-[450px] flex flex-col '>
                      <PasswordField
                        name="password"
                        value={values.password}
                        placeholder="Password"
                        className="border w-full h-[51px] rounded-lg border-[#8F8F8F] mt-1.5"
                        onChange={handleChange}
                      />
                  </div>

                    <div className='w-full xl:w-[450px] flex flex-col '>
                      <PasswordField
                        name="newPassword"
                        value={values.newPassword}
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

                   
                </div>
  
            </Form>
          )}
          </Formik>
        </div>
        

      </div>
  )
}

export default ResetPassword