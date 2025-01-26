import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const TeacherDashboardLayout = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
            {/* Left Sidebar */}
            <div className="lg:w-1/4 w-full bg-white shadow-lg flex flex-col items-center py-5">
                <h1 className="text-2xl font-semibold bg-[#0048B0] text-white px-10 py-3 mb-6 text-center w-full lg:w-auto">
                    Teacher Dashboard
                </h1>
                {/* Profile Image */}
                <img
                    className="w-24 h-24 rounded-full border-4 border-gray-200"
                    src={user.photoURL}
                    alt="User Profile"
                />
                {/* User Name */}
                <h2 className="mt-2 text-lg font-semibold text-center">{user.displayName}</h2>
                {/* Buttons */}
                <div className="mt-8 w-full px-6 flex flex-col gap-3">
                    <NavLink to="/" className="bg-[#0048B0] py-3 text-center text-white rounded hover:bg-[#2077f1]">
                        Home
                    </NavLink>
                    <NavLink
                        to="/teacherDashboard/addClass"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-[#2077f1] py-3 text-center text-white rounded"
                                : "bg-[#0048B0] py-3 text-center text-white rounded hover:bg-[#2077f1]"
                        }
                    >
                        Add Class
                    </NavLink>
                    <NavLink
                        to="/teacherDashboard/myClass"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-[#2077f1] py-3 text-center text-white rounded"
                                : "bg-[#0048B0] py-3 text-center text-white rounded hover:bg-[#2077f1]"
                        }
                    >
                        My Class
                    </NavLink>
                    <NavLink
                        to="/teacherDashboard/profile"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-[#2077f1] py-3 text-center text-white rounded"
                                : "bg-[#0048B0] py-3 text-center text-white rounded hover:bg-[#2077f1]"
                        }
                    >
                        Profile
                    </NavLink>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:w-3/4 w-full p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default TeacherDashboardLayout;