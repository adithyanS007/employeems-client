import React from 'react'
import Sidebar from '../components/employeeDashboard/sidebar.jsx'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/navbar.jsx'

const EmployeeDashboard = () => {
  return (
    <div className="flex">
            <Sidebar />
            {/* Use min-h-screen to ensure it covers the screen but grows with content */}
            <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
                <Navbar />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
  )
}

export default EmployeeDashboard
