import React, { useEffect } from 'react'
import { LOGO } from '../utils/constants'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { addUser } from '../utils/userSlice'

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        const {uid, email, displayName, photoURL} = user
        dispatch(addUser({uid, email, displayName, photoURL}))
        navigate('/browse')
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    })
    return () => unsubscribe()
  }, [])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser())
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (
    <div className='absolute px-8 py-2 bg-linear-to-b from-black z-10 flex w-full justify-between items-center'>
      <img className='w-44' src={LOGO} alt="logo" />
      {user && <div className='flex items-center gap-3 p-2'> 
        <img className='w-14 h-14 rounded-lg' src={user.photoURL} alt="user-avatar" /> 
        <button className='bg-red-600 text-white font-bold p-2 rounded-md' onClick={handleSignOut}>Sign Out</button>
        </div>
      }
    </div>
  )
}

export default Header