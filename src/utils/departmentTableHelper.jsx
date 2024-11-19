import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
    {
        name: "Sl No",
        selector: (row) => row.slno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action,
    },
];

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete ?");
        if (confirm) {
            try {
                const response = await axios.delete(`https://employeems-server-eta.vercel.app/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.success) {
                    onDepartmentDelete(id);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }else{
                    alert("An error occurred during deletion")
                }
            }
        }
    };

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-green-600 text-white rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
            >
                Edit
            </button>
            <button className="px-3 py-1 bg-red-600 text-white rounded shadow-lg transition-transform transform hover:scale-105 hover:shadow-2x" 
             onClick={() => handleDelete(Id)}>
                Delete
            </button>
        </div>
    );
};
