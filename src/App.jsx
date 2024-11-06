import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/mainHome.jsx";
import LoginPage from "./pages/loginPage.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import PrivateRoutes from "./utils/privateRoutes.jsx";
import RoleBasedRoutes from "./utils/roleBasedRoutes.jsx";
import AdminSummary from "./components/dashboard/adminSummary.jsx";
import DepartmentList from "./components/department/departmentList.jsx";
import AddDepartment from "./components/department/addDepartment.jsx";
import EditDepartment from "./components/department/editDepartment.jsx";
import EmployeeList from "./components/employee/employeeList.jsx";
import AddEmployee from "./components/employee/addEmployee.jsx";
import View from "./components/employee/view.jsx";
import EditEmployee from "./components/employee/editEmployee.jsx";
import AddSalary from "./components/salary/addSalary.jsx";
import ViewSalary from "./components/salary/viewSalary.jsx";
import LeaveTable from "./components/leave/leaveTable.jsx";
import LeaveDetail from "./components/leave/leaveDetail.jsx";

import EmployeeDashboard from "./pages/employeeDashboard.jsx";
import EmpSummaryCard from "./components/employeeDashboard/empSummaryCard.jsx";
import LeaveList from "./components/leave/leaveList.jsx";
import AddLeave from "./components/leave/addLeave.jsx";
import Setting from "./components/employeeDashboard/setting.jsx";
import AddAttendance from "./components/attendence/addAttendance.jsx";
import ViewAttendance from "./components/attendence/viewAttendance.jsx";
import SendEmail from "./components/sendEmails/sendEmail.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Default route to Home (which includes Navbar, HomePage, and About) */}
                <Route path="/" element={<Home />} />

                {/* Route for LoginPage */}
                <Route path="/login" element={<LoginPage />} />
                
                <Route path="/admin-dashboard" element={
                    <PrivateRoutes>
                        <RoleBasedRoutes requiredRole={["admin"]}>
                          <AdminDashboard />
                        </RoleBasedRoutes>
                    </PrivateRoutes>

                }>
                    <Route index element={<AdminSummary />}></Route>
                    <Route path='departments' element={<DepartmentList />}></Route>
                    <Route path='add-department' element={<AddDepartment />}></Route>
                    <Route path='department/:id' element={<EditDepartment />}></Route>

                    <Route path='employees' element={<EmployeeList />}></Route>
                    <Route path='add-employee' element={<AddEmployee />}></Route>
                    <Route path='employees/:id' element={<View />}></Route>
                    <Route path='employees/edit/:id' element={<EditEmployee />}></Route>

                    <Route path='salary/add' element={<AddSalary />}></Route>
                    <Route path='employees/salary/:id' element={<ViewSalary />}></Route>
                    
                    <Route path='leaves' element={<LeaveTable />}></Route>
                    <Route path='leaves/:id' element={<LeaveDetail />}></Route>
                    <Route path='employees/leaves/:id' element={<LeaveList />}></Route>

                    <Route path="employees/attendance/:id" element={<ViewAttendance />}></Route>

                    <Route path="/admin-dashboard/setting" element={<Setting />}></Route>
                    <Route path="/admin-dashboard/notify" element={<SendEmail />}></Route>

                </Route>

                {/* Employee Dashboard */}
                <Route path="/employee-dashboard" element={
                    <PrivateRoutes>
                        <RoleBasedRoutes requiredRole={["admin", "employee"]}>
                           <EmployeeDashboard />
                        </RoleBasedRoutes>
                    </PrivateRoutes>
                 }>
                    
                    <Route index element={<EmpSummaryCard />}></Route>

                    <Route path="/employee-dashboard/profile/:id" element={<View />}></Route>
                    <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />}></Route>
                    <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
                    <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />}></Route>
                    <Route path="/employee-dashboard/setting" element={<Setting />}></Route>
                   
                    <Route path="/employee-dashboard/attendance/:id" element={<AddAttendance />}></Route> 
                    <Route path="/employee-dashboard/view-attendance" element={<ViewAttendance />}></Route>
                   
 


                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
