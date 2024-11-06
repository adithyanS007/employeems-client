import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboardCustomize, MdOutlineSettingsSuggest, MdMarkEmailUnread } from 'react-icons/md';
import { FaUsersLine, FaBuildingUser, FaUserClock } from 'react-icons/fa6';
import { SiLibreofficeimpress } from "react-icons/si";
import { RiMoneyDollarBoxFill } from "react-icons/ri";

const AdminSidebar = () => {
    return (
        <div className="bg-black text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className="bg-[#00df9a] h-12 flex items-center justify-center">
                <h3 className="text-2xl text-center font-slab">Manage Employee</h3>
            </div>
            <div className="px-4">
                <NavLink 
                    to="/admin-dashboard"
                    className={({ isActive }) => `${isActive ? "bg-[#63caa9] text-black font-semibold" : " "} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`} 
                    end>
                    <MdDashboardCustomize />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/employees"
                    className={({ isActive }) => `${isActive ? "bg-[#63caa9] text-black font-semibold" : " "} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`}>
                    <FaUsersLine />
                    <span>Employees</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/departments"
                    className={({ isActive }) => `${isActive ? "bg-[#63caa9] text-black font-semibold" : " "} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`}>
                    <FaBuildingUser />
                    <span>Departments</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/leaves"
                    className={({ isActive }) => `${isActive ? "bg-[#63caa9] text-black font-semibold" : " "} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`}>
                    <SiLibreofficeimpress />
                    <span>Leave</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/salary/add"
                    className={({ isActive }) => `${isActive ? "bg-[#63caa9] text-black font-semibold" : " "} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`}>
                    <RiMoneyDollarBoxFill />
                    <span>Salary</span>
                </NavLink>

                {/* <NavLink 
                    to="/admin-dashboard/attendance"
                    className={({ isActive }) => `${isActive ? "bg-[#63caa9] text-black font-semibold" : " "} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`}>
                    <FaUserClock />
                    <span>Attendance</span>
                </NavLink> */}

                <NavLink 
                    to="/admin-dashboard/notify"
                    className={({ isActive }) => `${isActive ? "bg-[#63caa9] text-black font-semibold" : " "} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`}>
                    <MdMarkEmailUnread />
                    <span>Notify</span>
                </NavLink>

                <NavLink 
                    to="/admin-dashboard/setting"
                    className={({ isActive }) => `${isActive ? "bg-[#63caa9] text-black font-semibold" : " "} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`}>
                    <MdOutlineSettingsSuggest />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    );
};

export default AdminSidebar;
