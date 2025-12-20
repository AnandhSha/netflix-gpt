import React, { useEffect } from 'react'
import { LOGO } from '../utils/constants'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { addUser } from '../utils/userSlice'
import { toggleGPTSearch } from '../utils/gptSlice'
import { setLanguage } from '../utils/configSlice'

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user)
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch)

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
  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearch())
  }

  const handleLanguageChange = (event) => {
    dispatch(setLanguage(event.target.value))
  }
  return (
    <div className='absolute px-8 py-2 bg-linear-to-b from-black z-10 flex w-full justify-between items-center'>
      <img className='w-44' src={LOGO} alt="logo" />
      {user && 
      <div className='flex gap-3 p-2'> 
      {showGPTSearch && 
      <select className='p-2 h-10 bg-white text-black rounded-md' onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="ta">Tamil</option>
        <option value="ja">Japanese</option>
      </select>}
      <button className='bg-purple-600 text-white w-28 h-10 font-bold p-2 rounded-md' onClick={handleGPTSearchClick}> {showGPTSearch ? 'Home Page' : 'GPT Search'}</button>
        <div className='flex flex-col items-center gap-1'>
          <img className='w-12 h-12 rounded-lg' src={user.photoURL} alt="user-avatar" /> 
          <h1 className='text-green-600 text-lg font-bold'>{user.displayName}</h1>
        </div>
        <button className='bg-red-600 text-white w-24 h-10 font-bold p-2 rounded-md' onClick={handleSignOut}>Sign Out</button>
      </div>
      }
    </div>
  )
}

export default Header