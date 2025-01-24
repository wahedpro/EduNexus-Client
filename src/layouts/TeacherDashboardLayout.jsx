import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const TeacherDashboardLayout = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Sidebar */}
            <div className="w-1/4 bg-white shadow-lg flex flex-col items-center py-3">
                <h1 className="text-2xl font-semibold bg-[#0048B0] text-white px-10 py-2 mb-6">Teacher Dashboard</h1>
                {/* Profile Image */}
                <img
                    className="w-24 h-24 rounded-full border-4 border-gray-200"
                    src={user.photoURL}
                    alt="User Profile"
                />
                {/* User Name */}
                <h2 className="mt-2 text-lg font-semibold">{user.displayName}</h2>
                {/* Buttons */}
                <div className="mt-8 w-full px-6 flex flex-col gap-1 bg-gray-100">
                    <NavLink to='/' className="bg-[#0048B0] py-3 text-white px-5">Home</NavLink>
                    <NavLink to='/teacherDashboard/addClass'
                        className={({ isActive }) =>
                            isActive ? "bg-[#2077f1] px-5 py-3 text-white" : "bg-[#0048B0] px-5 py-3 text-white"
                        }
                    >Add Class</NavLink>
                    <NavLink to='/teacherDashboard/myClass'
                        className={({ isActive }) =>
                            isActive ? "bg-[#2077f1] px-5 py-3 text-white" : "bg-[#0048B0] px-5 py-3 text-white"
                        }
                    >My Class</NavLink>
                    <NavLink to="/teacherDashboard/profile"
                        className={({ isActive }) =>
                            isActive ? "bg-[#2077f1] px-5 py-3 text-white" : "bg-[#0048B0] px-5 py-3 text-white"
                        }
                    >Profile</NavLink>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="w-3/4 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default TeacherDashboardLayout;