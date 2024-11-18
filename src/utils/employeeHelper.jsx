import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "Sl No",
        selector: (row) => row.slno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "140px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "170px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "130px"
    },
    {
        name: "Action",
        selector: (row) => (
            <EmployeeButtons Id={row.userId._id} /> 
        )
        // center: "true"
    },
];

export const fetchDepartments = async () =>{
    let departments
    try {
        const response = await axios.get('https://employeems-server-psi.vercel.app/api/department', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.data.success) {
           departments = response.data.departments 
        }
    }catch(error){
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    } 
    return departments
};

// employee for salary form
export const getEmployees = async (id) =>{
    let employees;
    try {
        const response = await axios.get(
            `https://employeems-server-psi.vercel.app/api/employee/department/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.data.success) {
           employees = response.data.employees 
        }
    }catch(error){
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    } 
    return employees
};


export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate()

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-[#00df9a] text-white rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-2x"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
            >
                View
            </button>
            <button className="px-3 py-1 bg-[#00df9a] text-white rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-2x"
              onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
            >
                Edit
            </button>
            <button className="px-3 py-1 bg-[#00df9a] text-white rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-2x" 
              onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
            >
                Salary
            </button>
            <button className="px-3 py-1 bg-[#00df9a] text-white  rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-2x"
              onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
            >
                Leave
            </button>
            <button className="px-3 py-1 bg-[#00df9a] text-white  rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-2x"
              onClick={() => navigate(`/admin-dashboard/employees/attendance/${Id}`)}
            >
                Atendance
            </button>
        </div>
    );
};
