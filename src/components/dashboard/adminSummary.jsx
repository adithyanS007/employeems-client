import React, { useEffect, useState } from "react";
import axios from 'axios';
import SummaryCard from "./summaryCard";
import { FaBuildingUser, FaUsersLine } from "react-icons/fa6";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { SiLibreofficeimpress } from "react-icons/si";
import { FaUserTimes } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { MdOutlinePendingActions } from "react-icons/md";

const AdminSummary = () => {

    const [summary, setSummary] = useState(null)

    useEffect (() => {
        const fetchSummary = async () => {
            try {
                const summary = await axios.get('http://localhost:5000/api/dashboard/summary', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setSummary(summary.data)
            } catch (error) {
                if(error.response){
                    alert(error.response.data.error)
                }
                console.log(error.message)
            }
        }
        fetchSummary()
    }, [])

    if (!summary){
        return <div>Loading......</div>
    }

    return (
        <div className="p-6 pt-16">
            <h3 className="text-2xl font-bold">Dashboard Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <SummaryCard
                    icon={<FaUsersLine />}
                    text="Total Employees"
                    number={summary.totalEmployees}
                    gradient="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-400 hover:to-green-400"
                />
                <SummaryCard
                    icon={<FaBuildingUser />}
                    text="Total Departments"
                    number={summary.totalDepartments}
                    gradient="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400"
                />
                <SummaryCard
                    icon={<RiMoneyDollarBoxFill />}
                    text="Monthly Salary"
                    number={summary.totalSalary}
                    gradient="bg-gradient-to-r from-red-500 to-pink-900 hover:from-red-400 hover:to-pink-800"
                />
            </div>

            <div className="mt-12">
                <h4 className="text-center text-2xl font-bold">Leave Details</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <SummaryCard
                        icon={<SiLibreofficeimpress />}
                        text="Leave Applied"
                        number={summary.leaveSummary.appliedFor}
                        gradient="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400"
                    />
                    <SummaryCard
                        icon={<FcApproval />}
                        text="Leave Approved"
                        number={summary.leaveSummary.approved}
                        gradient="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-300 hover:to-blue-300"
                    />
                    <SummaryCard
                        icon={<MdOutlinePendingActions />}
                        text="Leave Pending"
                        number={summary.leaveSummary.pending}
                        gradient="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400"
                    />
                    <SummaryCard
                        icon={<FaUserTimes />}
                        text="Leave Rejected"
                        number={summary.leaveSummary.rejected}
                        gradient="bg-gradient-to-r from-red-800 to-pink-700 hover:from-red-700 hover:to-pink-600"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminSummary;
