import React from 'react'
import { IoClose } from 'react-icons/io5'

const Words = ({handleClose, transcription}) => {
    console.log(transcription, "salam")
  return (
    <div className='bg-[#fff] mt-[100px] overflow-auto xl:mt-[10px] h-[580px] w-full py-5 xl:w-[500px] px-5 '>
        <div className='flex justify-end cursor-pointer' onClick={handleClose}>
            <IoClose className='text-lg'/>
        </div>
        <p className='text-[#19373E] font-inter font-medium text-[24px] text-center'>Transcribed Audio</p>

        <div className='flex flex-col gap-3 items-center'>

          <div className='w-full flex flex-col xl:flex-row  gap-4 items-center mt-4'>

            <div className='w-full h-auto p-2 gap-2 rounded-lg bg-blue-300 text-[#fff] flex flex-col'>
              <p className='text-center text-base font-medium font-poppins'>Sentiments</p>
              <div className='flex flex-col gap-1'>
                <p className='font-poppins'>Score: {transcription?.sentiments?.average?.sentiment_score || "Not Available"}</p>
                <p className='font-poppins'>Sentiment: {transcription?.sentiments?.average?.sentiment || "Not Available"}</p>
              </div>
            </div>

            <div className='w-full h-auto p-2 gap-2 rounded-lg bg-green-300 text-[#fff] flex flex-col'>
              <p className='text-center text-base font-medium font-poppins'>Words</p>
              <div className='flex flex-col gap-1'>
                <p className='font-poppins'>Start Word: {transcription?.sentiments?.segments[0]?.start_word || "Not Available"}</p>
                <p className='font-poppins'>End Word: {transcription?.sentiments?.segments[0]?.end_word + 1 || "Not Available"}</p>
              </div>
            </div>

          </div>

          <div className='w-full flex-col xl:flex-row flex gap-4 items-center mt-4'>

            <div className='w-full h-auto p-2 gap-2 rounded-lg bg-pink-300 text-[#fff] flex flex-col'>
              <p className='text-center text-base font-medium font-poppins'>Topic</p>
              <div className='flex flex-col gap-1'>
                <p className='font-poppins'>{transcription?.topics?.segments[0]?.topics[0]?.topic || "Not Available"}</p>
              </div>
            </div>

            <div className='w-full h-auto p-2 gap-2 rounded-lg bg-red-300 text-[#fff] flex flex-col'>
              <p className='text-center text-base font-medium font-poppins'>Intent</p>
              <div className='flex flex-col gap-1'>
                <p className='font-poppins'>{transcription?.intents?.segments[0]?.intents[0]?.intent || "Not Available"}</p>
              </div>
            </div>

          </div>

          <div className='w-full h-auto p-2 gap-2 rounded-lg bg-teal-400 text-[#fff] flex flex-col'>
              <p className='text-center text-base font-medium font-poppins'>Transcript</p>
              <div className='flex flex-col gap-1'>
                <p className='font-poppins'>{transcription?.channels[0]?.alternatives[0]?.transcript || "Not Available"}</p>
              </div>
          </div>

          <div className='w-full h-auto p-2 gap-2 rounded-lg bg-indigo-300 text-[#fff] flex flex-col'>
              <p className='text-center text-base font-medium font-poppins'>Summary</p>
              <div className='flex flex-col gap-1'>
                <p className=' font-poppins'>{transcription?.summary?.short || "Not Available"}</p>
              </div>
          </div>

       

          
        

        </div>


    </div>
  )
}

export default Words