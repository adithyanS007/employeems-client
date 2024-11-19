import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/employeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        name: "",
        maritalStatus: "",
        designation: "",
        salary: 0,
        department: "",
    });
    const [departments, setDepartments] = useState(null);
    const [employeeId, setEmployeeId] = useState(""); // State to store employee ID
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://employeems-server-eta.vercel.app/api/employee/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log("API response", response.data);
                if (response.data.success && response.data.employee) {
                    const fetchedEmployee = response.data.employee;
                    // Set employee data
                    setEmployee((prev) => ({
                        ...prev,
                        name: fetchedEmployee.userId ? fetchedEmployee.userId.name : "",
                        maritalStatus: fetchedEmployee.maritalStatus || "",
                        designation: fetchedEmployee.designation || "",
                        salary: fetchedEmployee.salary || 0,
                        department: fetchedEmployee.department ? fetchedEmployee.department._id : "",
                    }));
                    // Store the employee._id for updating later
                    setEmployeeId(fetchedEmployee._id);
                }
            } catch (error) {
                console.log("Error fetching employee:", error);
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`https://employeems-server-eta.vercel.app/api/employee/${employeeId}`, employee, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("API response", response.data);
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>
            {departments && employee ? (
                <div className="max-w-4xl max-auto mt-10 bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Marital Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="">
                                    Marital Status
                                </label>
                                <select
                                    name="maritalStatus"
                                    onChange={handleChange}
                                    value={employee.maritalStatus}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                </select>
                            </div>

                            {/* Designation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    onChange={handleChange}
                                    value={employee.designation}
                                    placeholder="Enter Designation"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Salary */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="">
                                    Salary
                                </label>
                                <input
                                    type="number"
                                    name="salary"
                                    onChange={handleChange}
                                    value={employee.salary}
                                    placeholder="Enter Salary"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                />
                            </div>

                            {/* Department */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="">
                                    Department
                                </label>
                                <select
                                    name="department"
                                    onChange={handleChange}
                                    value={employee.department}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((dep) => (
                                        <option key={dep._id} value={dep._id}>
                                            {dep.dep_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Update Employee
                        </button>
                    </form>
                </div>
            ) : (
                <div>Loading....</div>
            )}
        </>
    );
};

export default EditEmployee;
