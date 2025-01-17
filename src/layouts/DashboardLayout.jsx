
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    
    return (
        <div className="flex h-screen bg-gray-100">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-white shadow-lg flex flex-col items-center py-10">
            {/* Profile Image */}
            <img
                className="w-24 h-24 rounded-full border-4 border-gray-200"
                // src={user.photoURL}
                alt="User Profile"
            />
            {/* User Name */}
            <h2 className="mt-4 text-lg font-semibold">John Doe</h2>
            {/* Buttons */}
            <div className="mt-8 w-full px-6 flex flex-col gap-1 bg-gray-100">
                <NavLink to='/' className="bg-blue-600 py-3 text-white px-5">Home</NavLink>
                <NavLink to='/dashboard/MyEnrollClass' className="bg-blue-600 py-3 text-white px-5">My Enroll Class</NavLink>
                <NavLink to="/dashboard/profile" className="bg-blue-600 py-3 text-white px-5">Profile</NavLink>
            </div>
        </div>

        {/* Right Content Area */}
        <div className="w-3/4 p-10">
            <Outlet></Outlet>
        </div>
    </div>
    );
};

export default DashboardLayout;