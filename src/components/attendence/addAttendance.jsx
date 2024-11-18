// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaArrowRightToBracket } from "react-icons/fa6";

// const AddAttendance = () => {
//     const navigate = useNavigate();

//     const handleCheckIn = () => {
//         // Perform any additional logic if necessary (e.g., API call to log check-in)
//         // After that, redirect to the Check-out page
//         navigate('/employee-dashboard/checkout-attendance');
//     };

//     return (
//         <div className="mt-16">
//             <div className="text-center">
//                 <h2 className="text-2xl font-bold">Attendance Form</h2>
//             </div>

//             <div className="flex justify-between items-center">
//                 <p className="text-xl text-[#00df9a]">Stamp your Attendance!</p>
//                 <Link to="/employee-dashboard/view-attendance" className="px-4 py-1 bg-[#4a9980] rounded text-white">
//                     Attendance History
//                 </Link>
//             </div>

//             <div className="w-2/3 h-[450px] bg-slate-300 shadow-lg rounded-lg p-6 flex flex-col justify-center items-center mx-auto mt-20">
//                 <h2 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl leading-snug tracking-wider font-serif">
//                     ATTENDANCE COUNTS <br />
//                     be here! <br />
//                     EVERY DAY, ALL DAY
//                 </h2>
//                 <div 
//                     className="flex justify-center items-center mt-10 text-8xl bg-blue-300 text-white rounded-full w-40 h-40 cursor-pointer"
//                     onClick={handleCheckIn} // Call the handler on click
//                 >
//                     <FaArrowRightToBracket />
//                 </div>
//                 <p className="mt-6 text-lg font-medium">Turn It On!</p>
//             </div>
//         </div>
//     );
// };

// export default AddAttendance;


import React, { useEffect, useState } from "react";
import { FaArrowRightToBracket, FaArrowRightFromBracket } from "react-icons/fa6";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { Link, useParams } from "react-router-dom";

const AddAttendance = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    // Utility function to retrieve token
    const getToken = () => localStorage.getItem('token');

    // Check attendance status when the component mounts
    useEffect(() => {
        const checkAttendanceStatus = async () => {
            try {
                const response = await axios.get(`https://employeems-server-psi.vercel.app/api/attendance/status/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${getToken()}`,
                    },
                });
                setIsCheckedIn(response.data.isCheckedIn);
            } catch (error) {
                alert(error.response?.data?.error || "Error fetching attendance status");
                console.error("Error fetching attendance status:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAttendanceStatus();
    }, [id]);

    const handleCheckIn = async () => {
        try {
            const response = await axios.post("https://employeems-server-psi.vercel.app/api/attendance/checkin", {}, {
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                },
            });
            setIsCheckedIn(true);
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.error || "Error checking in");
            console.error("Error checking in:", error);
        }
    };

    const handleCheckOut = async () => {
        try {
            const response = await axios.post("https://employeems-server-psi.vercel.app/api/attendance/checkout", {}, {
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                },
            });
            setIsCheckedIn(false);
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.error || "Error checking out");
            console.error("Error checking out:", error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mt-16">
            <div className="flex justify-center items-center">
                <h2 className="text-2xl font-bold">Attendance Form</h2>
                
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xl text-[#00df9a]">
                    {isCheckedIn ? "You are checked in!" : "Stamp your Attendance!"}
                </p>
                {user.role === "employee" && (
                    <Link to="/employee-dashboard/view-attendance" className="px-4 py-1 bg-[#4a9980] rounded text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-2x">
                        Attendance History
                    </Link>
                )}
            </div>

            {/* Conditional Rendering: Show Check-in or Check-out based on attendance status */}
            {isCheckedIn ? (
                <div className="w-2/3 h-[450px] bg-slate-300 shadow-lg rounded-lg p-6 flex flex-col justify-center items-center mx-auto mt-20">
                    <h2 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl leading-snug tracking-wider font-serif">
                        THANK YOU FOR TODAY
                    </h2>
                    <p className="mt-4 text-center">
                        The world of business survives less on leadership skill and more on the commitment
                        and dedication of passionate employees like you. <br /> Thank you for your hard work.
                    </p>
                    <div
                        className="flex justify-center items-center mt-10 text-8xl bg-red-800 text-white rounded-full w-40 h-40 cursor-pointer"
                        onClick={handleCheckOut}
                    >
                        <FaArrowRightFromBracket />
                    </div>
                    <p className="mt-6 text-lg font-medium">Click to Check-out</p>
                </div>
            ) : (
                <div className="w-2/3 h-[450px] bg-slate-300 shadow-lg rounded-lg p-6 flex flex-col justify-center items-center mx-auto mt-20">
                    <h2 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl leading-snug tracking-wider font-serif">
                        ATTENDANCE COUNTS <br />
                        be here! <br />
                        EVERY DAY, ALL DAY
                    </h2>
                    <div
                        className="flex justify-center items-center mt-10 text-8xl bg-blue-300 text-white rounded-full w-40 h-40 cursor-pointer"
                        onClick={handleCheckIn}
                    >
                        <FaArrowRightToBracket />
                    </div>
                    <p className="mt-6 text-lg font-medium">Click to Check-in</p>
                </div>
            )}
        </div>
    );
};

export default AddAttendance;




