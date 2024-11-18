import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { columns, LeaveButtons } from "../../utils/leaveTableHelper";
import axios from "axios";


const LeaveTable = () => {
    const [leaves, setLeaves] = useState(null)
    const [filteredLeaves, setFilteredLeaves] = useState(null)

    const fetchLeaves = async () => {
        try {
            const response = await axios.get("https://employeems-server-psi.vercel.app/api/leave", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data)
            if (response.data.success) {
                let slno = 1;
                const data = await response.data.leaves.map((leave) => ({
                    _id: leave._id,
                    slno: slno++,
                    employeeId: leave.employeeId.employeeId,
                    name: leave.employeeId.userId.name,
                    leaveType: leave.leaveType,
                    department: leave.employeeId.department.dep_name,
                    // userId: leave.userId,
                    days: 
                      new Date(leave.endDate).getDate() -
                      new Date(leave.startDate).getDate(),
                    status: leave.status,  
                    action: <LeaveButtons Id={leave._id} />,
                }));
                setLeaves(data);
                setFilteredLeaves(data)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };
    useEffect(() => {
        fetchLeaves()
    }, []);

    const filterByInput = (e) => {
       const data = leaves.filter((leave) => 
        leave.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data)
    }
    const filterByButton = (status) => {
       const data = leaves.filter((leave) => 
        leave.status
        .toLowerCase()
        .includes(status.toLowerCase())
    );
    setFilteredLeaves(data)
    }

    return ( 
    <>
        {filteredLeaves ? (
        <div className="pt-16 ">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center">
                <input 
                 type="text" 
                 placeholder="Search By Emp ID" 
                 className="px-4 py-0.5 border"
                 onChange={filterByInput} 
                />
                <div className="space-x-3">
                    <button className="px-2 py-1 bg-[#00df9a] text-white hover:bg-[#07573e]" onClick={() => filterByButton("Pending")}>Pending</button>
                    <button className="px-2 py-1 bg-[#00df9a] text-white hover:bg-[#07573e]" onClick={() => filterByButton("Approved")}>Approved</button>
                    <button className="px-2 py-1 bg-[#00df9a] text-white hover:bg-[#07573e]" onClick={() => filterByButton("Rejected")}>Rejected</button>
                </div>
            </div>

           <div className="mt-3"> 
            <DataTable columns={columns} data={filteredLeaves} pagination/>
            </div> 
        </div>
      ) : <div>Loading.......</div>}
    </>
    );
};

export default LeaveTable;
