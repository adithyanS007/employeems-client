import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../context/authContext';

const LeaveList = () => {
    const [leaves, setLeaves] = useState([])
    let slno = 1;
    const {id} = useParams()
    const {user} = useAuth()

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`https://employeems-server-psi.vercel.app/api/leave/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data)
            if (response.data.success) {
                setLeaves(response.data.leaves);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    return (
        <div className="pt-16">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                 type="text" 
                 placeholder="Search By Dep Name" 
                 className="px-4 py-0.5 border" 
                />
                {user.role === "employee" && (
                  <Link 
                    to="/employee-dashboard/add-leave" 
                    className="px-4 py-1 bg-teal-600 rounded text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-2x">
                    Add New Leave
                  </Link>
                )}
            </div>

            <table className="w-full text-sm text-left text-gray-500 mt-6">
                <thead className="text -xs text-gray-700 uppercase bg-gray-50 border-gray-200">
                    <tr>
                        <th className="px-6 py-3">SLNO</th>
                        <th className="px-6 py-3">Leave Type</th>
                        <th className="px-6 py-3">From</th>
                        <th className="px-6 py-3">To</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Applied Date</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {leaves.map((leave) => (
                        <tr key={leave._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-white">
                            <td className="px-6 py-3">{slno++}</td>
                            <td className="px-6 py-3">{leave.leaveType}</td>
                            <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                            <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                            <td className="px-6 py-3">{leave.reason}</td>
                            <td className="px-6 py-3">{new Date(leave.appliedAt).toLocaleDateString()}</td>
                            <td className="px-6 py-3 font-bold">{leave.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveList;
