import React from 'react'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className='pt-[15%] px-12 w-screen aspect-video absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/3'>{overview}</p>
      <div className='flex gap-4'>
        <button className='bg-white text-black p-4 px-8 text-lg rounded-lg'>Play</button>
        <button className='bg-gray-500 text-white p-4 px-8 text-lg rounded-lg'>More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle