import React, { useState } from 'react'
import Header from './Header'
import { BG_URL } from '../utils/constants'

const Login = () => {

  const [isSignIn, setIsSignIn] = useState(true)

  const handleToggleSignIn = () => {
    setIsSignIn(!isSignIn)
  }

  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img src={BG_URL} alt="logo" />
      </div>
      <form className='absolute p-12  flex flex-col my-40 mx-auto left-0 right-0 w-[350px] bg-black text-white'>
        <h1 className='text-4xl font-bold'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignIn && (
          <input className='p-3 my-4 bg-gray-800 rounded-md' type="name" placeholder='Full Name' />
        )}
        <input className='p-3 my-4 bg-gray-800 rounded-md' type="email" placeholder='Email Address' />
        <input className='p-3 my-2 bg-gray-800 rounded-md' type="password" placeholder='Password' />
        <button className='p-3 my-8 bg-red-700 rounded-md'>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
        <p className='text-sm'>
          <span className='text-gray-500'>{isSignIn ? 'New to Netflix? ' : 'Already have an account? '}</span> 
          <span className='text-blue-500' onClick={handleToggleSignIn}>{isSignIn ? 'Sign up now.' : 'Sign in now.'}</span>
        </p>
      </form>
    </div>
  )
}

export default Login