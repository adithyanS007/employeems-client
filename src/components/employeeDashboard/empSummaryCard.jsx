import React from 'react'
import { FaUsersLine } from 'react-icons/fa6'
import { useAuth } from '../../context/authContext.jsx'


const EmpSummaryCard = () => {
    const {user} = useAuth()
  return (
    <div className='pt-16'>
        <div className="rounded bg-white flex ">
            <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4 `}>                
                <FaUsersLine />               
            </div>
            <div className="pl-4 py-1">
                <p className="text-lg font-semibold">Welcome Back</p>
                <p className="text-xl font-bold">{user.name}</p>
            </div>
        </div>
    </div>    
  )
}

export default EmpSummaryCard
