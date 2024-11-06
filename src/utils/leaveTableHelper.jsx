import { useNavigate } from "react-router-dom";


export const columns = [
    {
        name: "Sl No",
        selector: (row) => row.slno,
        width: "70px",
    },
    {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        width: "120px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: "120px",
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width: "140px",
    },
    {
        name: "Department",
        selector: (row) => row.department,
        width: "170px",
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: "80px",
    },
    {
        name: "Status",
        selector: (row) => (
            <span
                className={`font-bold ${
                    row.status === "Pending"
                        ? "text-yellow-500"
                        : row.status === "Approved"
                        ? "text-green-500"
                        : "text-red-500"
                }`}
            >
                {row.status}
            </span>
        ),
        width: "120px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        // center: true,
    },
];

export const LeaveButtons = ({Id}) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/${id}`);
    }

    return (
       <button 
          className="px-4 py-1 bg-[#00df9a] rounded text-white hover:bg-[#035138]"
          onClick={() => handleView(Id)}
       >
          View
       </button>
    );
};
