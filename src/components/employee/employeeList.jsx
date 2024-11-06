import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/employeeHelper";
import DataTable from "react-data-table-component";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/employee", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.success) {
                    let slno = 1;
                    const data = await response.data.employees.map((emp) => ({
                        _id: emp._id,
                        slno: slno++,
                        dep_name: emp.department.dep_name,
                        name: emp.userId.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        userId: emp.userId,
                        profileImage: <img src={`http://localhost:5000/${emp.userId.profileImage}`}/> ,
                        action: (<EmployeeButtons Id={emp._id} />),
                    }));
                    setEmployees(data);
                    setFilteredEmployees(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) => emp.userId.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredEmployees(records);
    };

    return (
        <div className="pt-16">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Employees</h3>
            </div>
            <div className="flex justify-around items-center">
                <input type="text" placeholder="Search By Dep Names" className="px-4 py-0.5" onChange={handleFilter} />

                <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-green-500 rounded text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-2x">
                    Add New
                </Link>
            </div>
            <div className="mt-6">
                <DataTable columns={columns} data={filteredEmployees} pagination />
            </div>
        </div>
    );
};

export default EmployeeList;
