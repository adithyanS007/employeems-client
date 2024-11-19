import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from "../../utils/departmentTableHelper";
import axios from "axios";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false)
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const onDepartmentDelete = (deletedId) => {
        setDepartments((prevDepartments) => 
            prevDepartments.filter(dep => dep._id !== deletedId)
        );
        setFilteredDepartments((prevFiltered) => 
            prevFiltered.filter(dep => dep._id !== deletedId)
        );
    };

    useEffect(() => {
        const fetchDepartments = async () =>{
            setDepLoading(true)
            try {
                const response = await axios.get('https://employeems-server-eta.vercel.app/api/department', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(response.data.success) {
                    let slno = 1;
                    const data = await response.data.departments.map((dep) => (
                        {
                            _id: dep._id,
                            slno: slno++,
                            dep_name: dep.dep_name,
                            action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete}/>),
                        }
                    ))
                    setDepartments(data)
                    setFilteredDepartments(data)
                }
            }catch(error){
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally{
                setDepLoading(false)
            }
        };

        fetchDepartments()
    }, []);

    const filterDepartments = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(searchValue));
        setFilteredDepartments(records);
    };

    return (
        <>{depLoading ? <div>Loading.....</div> : 
        <div className="pt-16">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Departments</h3>
            </div>
            <div className="flex justify-around items-center">
                <input type="text" placeholder="Search By Dep Names" className="px-4 py-0.5" onChange={filterDepartments} />
                <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-green-500 rounded text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-2x">
                    Add New
                </Link>
            </div>
            <div className="mt-5">
                <DataTable 
                  columns={columns} data={filteredDepartments} pagination
                />
            </div>
        </div>
        }</> 
    );
};

export default DepartmentList;
