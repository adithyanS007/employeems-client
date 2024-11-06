import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboardCustomize, MdOutlineSettingsSuggest } from "react-icons/md";
import { FaUsersLine, FaUserClock } from "react-icons/fa6";
import { SiLibreofficeimpress } from "react-icons/si";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
    const { user } = useAuth();
    return (
        <div className="bg-black text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
            <div className="bg-[#00df9a] h-12 flex items-center justify-center">
                <h3 className="text-3xl text-center font-slab font-bold">ePulse.</h3>
            </div>
            <div className="px-4">
                <NavLink
                    to="/employee-dashboard"
                    className={({ isActive }) =>
                        `${
                            isActive ? "bg-[#63caa9] text-black font-semibold" : " "
                        } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`
                    }
                    end
                >
                    <MdDashboardCustomize />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to={`/employee-dashboard/profile/${user._id}`}
                    className={({ isActive }) =>
                        `${
                            isActive ? "bg-[#63caa9] text-black font-semibold" : " "
                        } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`
                    }
                >
                    <FaUsersLine />
                    <span>My Profile</span>
                </NavLink>

                <NavLink
                    to={`/employee-dashboard/leaves/${user._id}`}
                    className={({ isActive }) =>
                        `${
                            isActive ? "bg-[#63caa9] text-black font-semibold" : " "
                        } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`
                    }
                >
                    <SiLibreofficeimpress />
                    <span>Leaves</span>
                </NavLink>

                <NavLink
                    to={`/employee-dashboard/salary/${user._id}`}
                    className={({ isActive }) =>
                        `${
                            isActive ? "bg-[#63caa9] text-black font-semibold" : " "
                        } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`
                    }
                >
                    <RiMoneyDollarBoxFill />
                    <span>Salary</span>
                </NavLink>
                <NavLink
                    to={`/employee-dashboard/attendance/${user._id}`}
                    className={({ isActive }) =>
                        `${
                            isActive ? "bg-[#63caa9] text-black font-semibold" : " "
                        } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`
                    }
                >
                    <FaUserClock />
                    <span>Attendence</span>
                </NavLink>

                <NavLink
                    to="/employee-dashboard/setting"
                    className={({ isActive }) =>
                        `${
                            isActive ? "bg-[#63caa9] text-black font-semibold" : " "
                        } flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-[#63caa9] hover:bg-opacity-50 hover:text-white font-medium`
                    }
                >
                    <MdOutlineSettingsSuggest />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
