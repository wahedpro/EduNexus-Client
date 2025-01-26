import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const StudentDashboardLayout = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
            {/* Left Sidebar */}
            <div className="lg:w-1/4 w-full bg-white shadow-lg flex flex-col items-center py-5">
                <h1 className="text-2xl font-semibold bg-[#0048B0] text-white px-10 py-3 mb-6 text-center lg:w-auto w-full">
                    Student Dashboard
                </h1>

                {/* Profile Image */}
                <img
                    className="w-24 h-24 rounded-full border-4 border-gray-200"
                    src={user?.photoURL}
                    alt="User Profile"
                />

                {/* User Name */}
                <h2 className="mt-3 text-lg font-semibold">{user?.displayName}</h2>

                {/* Buttons */}
                <div className="mt-8 w-full px-6 flex flex-col gap-3">
                    <NavLink
                        to="/"
                        className="bg-[#0048B0] py-3 text-center text-white rounded-md hover:bg-[#2077f1]"
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/dashboard/MyEnrollClass"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-[#2077f1] py-3 text-center text-white rounded-md"
                                : "bg-[#0048B0] py-3 text-center text-white rounded-md"
                        }
                    >
                        My Enroll Class
                    </NavLink>
                    <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-[#2077f1] py-3 text-center text-white rounded-md"
                                : "bg-[#0048B0] py-3 text-center text-white rounded-md"
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

export default StudentDashboardLayout;
