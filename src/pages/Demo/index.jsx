import React from 'react'

const Demo = () => {
  return (
    <div className='w-full'>
        <div className='w-10/12 mx-auto flex items-center justify-center my-40 lg:my-10'>
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/t6Pi1TpRl0w?si=gcxKpCj1ruEmT9gK" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen
            ></iframe>
        </div>
    </div>
  )
}

export default Demo