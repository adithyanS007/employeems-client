import React from "react";
import { useAuth } from "../context/authContext";
import AdminSidebar from "../components/dashboard/adminSidebar";
import Navbar from "../components/dashboard/navbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="flex">
            <AdminSidebar />
            {/* Use min-h-screen to ensure it covers the screen but grows with content */}
            <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
                <Navbar />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
