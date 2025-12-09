import React from 'react'
import { LOGO } from '../utils/constants'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser())
        navigate('/')
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