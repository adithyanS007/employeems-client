import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewAttendance = () => {
    const [attendances, setAttendances] = useState([]);
    let slno = 1;

    const { user } = useAuth();
    const { id: paramId } = useParams(); // Extract the id from useParams if needed
    const id = user.role === 'employee' ? user._id : paramId; // Use user._id if employee, else use paramId for admin

    const fetchAttendances = async () => {
        try {
            const response = await axios.get(`https://employeems-server-eta.vercel.app/api/attendance/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data);
            if (response.data.success) {
                setAttendances(response.data.attendances);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchAttendances();
    }, [id]); // Added id dependency to re-fetch when id changes

    // Function to format time to "Hour:Minute:Second"
    const formatTime = (time) => {
        return new Date(time).toLocaleTimeString(); // Formats time as "HH:MM:SS AM/PM"
    };

    return (
        <div className="pt-16">
            <div className="text-center">
                <h3 className="text-3xl font-bold">Attendance History</h3>
            </div>

            <table className="w-full text-sm text-left text-gray-500 mt-6">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-gray-200">
                    <tr>
                        <th className="px-6 py-3">SLNO</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Check In Time</th>
                        <th className="px-6 py-3">In Status</th>
                        <th className="px-6 py-3">Check Out Time</th>
                        <th className="px-6 py-3">Out Status</th>
                    </tr>
                </thead>

                <tbody>
                    {attendances.map((attendance) => (
                        <tr key={attendance._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-white">
                            <td className="px-6 py-3">{slno++}</td>
                            <td className="px-6 py-3">{new Date(attendance.date).toLocaleDateString()}</td>
                            <td className="px-6 py-3">{attendance.checkInTime ? formatTime(attendance.checkInTime) : "N/A"}</td>
                            <td className="px-6 py-3">{attendance.inStatus}</td>
                            <td className="px-6 py-3">{attendance.checkOutTime ? formatTime(attendance.checkOutTime) : "N/A"}</td>
                            <td className="px-6 py-3">{attendance.outStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAttendance;

