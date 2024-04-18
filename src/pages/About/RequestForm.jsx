import React, { useState } from 'react'

import { Form, Formik } from 'formik';
import { CgSpinner } from 'react-icons/cg';
import { IoClose } from "react-icons/io5";


const RequestForm = ({ handleClose }) => {
  const [loading, setLoading] = useState(false)

  return (
    <div className='bg-[#fff] mt-[10px] h-[520px] py-5 w-[500px] px-5 '>
      <div className='flex justify-end cursor-pointer' onClick={handleClose}>
        <IoClose className='text-lg'/>
      </div>
      <div className=' w-full '>
        <Formik
        initialValues={{
            // firstName: "",
            // lastName: "",
            fullName: "",
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
            <Form onSubmit={handleSubmit} className="flex ">
              <div className="flex flex-col gap-[21px]">
                  <p className='text-[#19373E] font-inter font-medium text-[24px] text-center'>Request Access</p>
                  
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

                  <div className='w-[450px] flex flex-col gap-2'>
                    <input 
                      name="fullName"
                      placeholder="Full Name"
                      type='text'
                      onChange={handleChange}
                      className='w-full  h-[58px] outline-none border border-[#8F8F8F] p-2.5'
                    />
                  </div>

                  <div className='w-[450px]  flex flex-col gap-2'>
                    <input 
                      name="companyName"
                      placeholder="Company Name"
                      type='text'
                      onChange={handleChange}
                      className='w-full  h-[58px] outline-none border border-[#8F8F8F] p-2.5'
                    />
                  </div>

          

                  <div className='w-[450px] flex flex-col gap-2'>
                    <textarea
                      name="message"
                      className='w-full outline-none border border-[#8F8F8F] p-2.5 h-[150px]'
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