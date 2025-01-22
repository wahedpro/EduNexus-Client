import { NavLink, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
    
    return (
        <div className="flex h-screen bg-gray-100">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-white shadow-lg flex flex-col items-center py-10">
            {/* Buttons */}
            <div className="mt-8 w-full px-6 flex flex-col gap-1 bg-gray-100">
                <NavLink to='/' className="bg-blue-600 py-3 text-white px-5">Home</NavLink>
                <NavLink to='/admin/teacherRequest' className="bg-blue-600 py-3 text-white px-5">Teacher Request</NavLink>
                <NavLink to='/admin/userList' className="bg-blue-600 py-3 text-white px-5">Users</NavLink>
                <NavLink to='/admin/allClasses' className="bg-blue-600 py-3 text-white px-5">All Classes</NavLink>
                <NavLink to="/admin/profile" className="bg-blue-600 py-3 text-white px-5">Profile</NavLink>
            </div>
        </div>

        {/* Right Content Area */}
        <div className="w-3/4 p-10">
            <Outlet></Outlet>
        </div>
    </div>
    );
};

export default AdminDashboardLayout;