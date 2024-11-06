import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const {user, logout} = useAuth()
  return (
    <div className='fixed top-0 left-64 w-[calc(100%-16rem)] flex items-center justify-between text-white h-12 bg-[#00df9a] p-5 z-10'>
      <p className='font-tahoma font-bold text-xl '>WELCOME {user.name}</p>
      <button className='px-4 py-1 bg-[#15644b] rounded hover:bg-[#3aa984] shadow-lg transition-transform transform hover:scale-105 hover:shadow-2x' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar
