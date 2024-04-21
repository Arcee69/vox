import React, { useState } from 'react'

import { Form, Formik } from 'formik';
import { CgSpinner } from 'react-icons/cg';
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';


const RequestForm = ({ handleClose }) => {
  const [loading, setLoading] = useState(false)

  const submitForm = async (values, action) => {
      setLoading(true)
      const data = {
          "full_name": values?.fullName,
          "email": values?.email,
          "phone": `+234${values?.phone}`,
          "company_name": values?.companyName,
          "message": values?.message
      }
      await axios.post("https://api.voxprinsight.com/api", data)
      .then((res) => {
        setLoading(false)
        console.log(res, "res")
        toast(`Request Submitted Successfully`, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
        })     
        handleClose()
      })
      .catch((err) => {
        console.log(err, "err")
        setLoading(false)
        toast(`Error`, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
        })  
        handleClose()
      })
  }

  return (
    <div className='bg-[#fff] mt-[100px] xl:mt-[10px] h-[580px] w-full py-5 xl:w-[500px] px-5 '>
      <div className='flex justify-end cursor-pointer' onClick={handleClose}>
        <IoClose className='text-lg'/>
      </div>
      <div className=' w-full '>
        <Formik
          initialValues={{
              fullName: "",
              email: "",
              phone: "",
              companyName: "",
              message: ""
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
                  <p className='text-[#19373E] font-inter font-medium text-[24px] text-center'>Request Consultation</p>
                  
                  {/* <div className='flex flex-col md:flex-row items-center gap-[35px]'>
                    <div className='flex flex-col gap-2 w-full md:w-[276px]'>
                      <input 
                        name="firstName"
                        placeholder="First Name"
                        type='text'
                        onChange={handleChange}
                        className='w-full md:w-[276px] h-[58px] outline-none border border-[#8F8F8F] p-2.5'
                      />
                    </div>
                    <div className='flex flex-col gap-2 w-full md:w-[276px]'>
                      <input 
                        name="lastName"
                        placeholder="Last Name"
                        type='text'
                        onChange={handleChange}
                        className='w-full md:w-[276px] h-[58px] outline-none border border-[#8F8F8F] p-2.5'
                      />
                    </div>

                  </div> */}

                  <div className='w-full xl:w-[450px] flex flex-col gap-2'>
                    <input 
                      name="fullName"
                      placeholder="Full Name"
                      type='text'
                      onChange={handleChange}
                      className='w-full h-[48px] outline-none border border-[#8F8F8F] p-2.5'
                    />
                  </div>

                  <div className='w-full xl:w-[450px] flex flex-col gap-2'>
                    <input 
                      name="email"
                      placeholder="Email"
                      type='text'
                      onChange={handleChange}
                      className='w-full  h-[48px] outline-none border border-[#8F8F8F] p-2.5'
                    />
                  </div>

                  <div className='w-full xl:w-[450px] flex flex-col gap-2'>
                    <input 
                      name="phone"
                      placeholder="Phone"
                      type='number'
                      onChange={handleChange}
                      className='w-full  h-[48px] outline-none border border-[#8F8F8F] p-2.5'
                    />
                  </div>

                  <div className='w-full xl:w-[450px]  flex flex-col gap-2'>
                    <input 
                      name="companyName"
                      placeholder="Company Name"
                      type='text'
                      onChange={handleChange}
                      className='w-full  h-[48px] outline-none border border-[#8F8F8F] p-2.5'
                    />
                  </div>

          

                  <div className='w-full xl:w-[450px] flex flex-col gap-2'>
                    <textarea
                      name="message"
                      className='w-full outline-none border border-[#8F8F8F] p-2.5 h-[100px]'
                      rows="5"
                      cols="10"
                      placeholder="Message"
                      type='text'
                      onChange={handleChange}
                    >

                    </textarea>
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

export default RequestForm