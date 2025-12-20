import React from 'react'
import { useSelector } from 'react-redux'
import { languageConstants } from '../utils/languageConstants'

const GptSearchbar = () => {
  const language = useSelector((store) => store.config.language)
  return (
    <div className='pt-[10%] z-50 text-white flex justify-center'>
      <form className='flex w-1/2 p-6 m-6 grid grid-cols-12 gap-4 justify-center items-center'>
        <input type="text" placeholder={languageConstants[language].placeholder} className='p-4 my-4 bg-white border border-gray-300 text-black rounded-lg col-span-10' />
        <button className='p-4 my-4 bg-red-700 rounded-lg col-span-2'>{languageConstants[language].search}</button>
      </form>
    </div>
  )
}
export default GptSearchbar