import { useState, useRef } from 'react'
import Header from './Header'
import { BG_URL } from '../utils/constants'
import { validateInput } from '../utils/validate'
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , updateProfile} from 'firebase/auth'
import { ANANDH_GITHUB_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser  } from '../utils/userSlice'

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true)
  const fullNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const dispatch = useDispatch()

  const handleToggleSignIn = () => {
    setIsSignIn(!isSignIn)
  }

  const handleSubmit = () => {
    const fullName = isSignIn ? null : fullNameRef.current.value
    const error = validateInput(fullName, emailRef.current.value, passwordRef.current.value, isSignIn)
    setErrorMessage(error)
    if(error) return

    if(isSignIn) {
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
        })
        .catch((error) => {
          console.log(error)
          const errorCode = error.code
          switch(errorCode) {
            
            case 'auth/invalid-email':
              setErrorMessage('Invalid email address')
              break
              case 'auth/invalid-credential':
                setErrorMessage('Invalid email or password')
                break
          }
        })
    } else {
      createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          updateProfile(user, {
            displayName: fullNameRef.current.value,
            photoURL: ANANDH_GITHUB_URL
          })
          .then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser
            dispatch(
              addUser({
              uid : uid || '',
              email : email || '',
              displayName : displayName || '',
              photoURL : photoURL || '',
            }))
          }).catch((error) => { 
            const errorMessage = error.message
            setErrorMessage(errorMessage)
          })
        })
        .catch((error) => {
          console.log(error)
          const errorCode = error.code
          switch(errorCode) {
            case 'auth/email-already-in-use':
              setErrorMessage('Email already in use')
              break
            case 'auth/invalid-email':
              setErrorMessage('Invalid email address')
              break
          }
        })
    }
  }

  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img src={BG_URL} alt="logo" />
      </div>
      <form onSubmit={event => event.preventDefault()} className='absolute p-12  flex flex-col my-40 mx-auto left-0 right-0 w-[350px] bg-black text-white'>
        <h1 className='text-4xl font-bold'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignIn && (
          <input ref={fullNameRef} className='p-3 my-4 bg-gray-800 rounded-md' type="name" placeholder='Full Name' />
        )}
        <input ref={emailRef} className='p-3 my-4 bg-gray-800 rounded-md' type="email" placeholder='Email Address' />
        <input ref={passwordRef} className='p-3 my-2 bg-gray-800 rounded-md' type="password" placeholder='Password' />
        <p className='text-red-500'>{errorMessage}</p>
        <button className='p-3 my-8 bg-red-700 rounded-md' onClick={handleSubmit}>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
        <p className='text-sm'>
          <span className='text-gray-500'>{isSignIn ? 'New to Netflix? ' : 'Already have an account? '}</span> 
          <span className='text-blue-500' onClick={handleToggleSignIn}>{isSignIn ? 'Sign up now.' : 'Sign in now.'}</span>
        </p>
      </form>
    </div>
  )
}

export default Login