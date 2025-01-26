// import { useContext } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import { AuthContext } from "../provider/AuthProvider";

// const AdminDashboardLayout = () => {
//     const { user } = useContext(AuthContext);
//     return (
//         <div className="flex h-screen bg-gray-100">
//             {/* Left Sidebar */}
//             <div className="w-1/4 bg-white shadow-lg flex flex-col items-center py-2">
//                 <h1 className="text-2xl font-semibold bg-[#0048B0] text-white px-10 py-2 mb-6">Admin Dashboard</h1>
//                 {/* Profile Image */}
//                 <img
//                     className="w-24 h-24 rounded-full border-4 border-gray-200"
//                     src={user.photoURL}
//                     alt="User Profile"
//                 />
//                 {/* User Name */}
//                 <h2 className="mt-2 text-lg font-semibold">{user.displayName}</h2>
//                 {/* Buttons */}
//                 <div className="mt-8 w-full px-6 flex flex-col gap-1 bg-gray-100">
//                     <NavLink to='/' className="bg-[#0048B0] py-3 text-white px-5">Home</NavLink>
//                     <NavLink to='/admin/teacherRequest'
//                         className={({ isActive }) =>
//                             isActive ? "bg-[#2077f1] px-5 py-3 text-white" : "bg-[#0048B0] px-5 py-3 text-white"
//                         }
//                     >Teacher Request</NavLink>
//                     <NavLink to='/admin/userList'
//                         className={({ isActive }) =>
//                             isActive ? "bg-[#2077f1] px-5 py-3 text-white" : "bg-[#0048B0] px-5 py-3 text-white"
//                         }
//                     >Users</NavLink>
//                     <NavLink to='/admin/allClasses'
//                         className={({ isActive }) =>
//                             isActive ? "bg-[#2077f1] px-5 py-3 text-white" : "bg-[#0048B0] px-5 py-3 text-white"
//                         }
//                     >All Classes</NavLink>
//                     <NavLink to="/admin/profile"
//                         className={({ isActive }) =>
//                             isActive ? "bg-[#2077f1] px-5 py-3 text-white" : "bg-[#0048B0] px-5 py-3 text-white"
//                         }
//                     >Profile</NavLink>
//                 </div>
//             </div>

//             {/* Right Content Area */}
//             <div className="w-3/4 p-10">
//                 <Outlet></Outlet>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboardLayout;

import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const AdminDashboardLayout = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
            {/* Left Sidebar */}
            <div className="lg:w-1/4 w-full bg-white shadow-lg flex flex-col items-center py-2">
                <h1 className="text-2xl font-semibold bg-[#0048B0] text-white px-10 py-2 mb-6 text-center">
                    Admin Dashboard
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
                <div className="mt-8 w-full px-6 flex flex-col gap-1">
                    <NavLink to="/" className="bg-[#0048B0] py-3 text-center text-white rounded hover:bg-[#2077f1]">
                        Home
                    </NavLink>
                    <NavLink
                        to="/admin/teacherRequest"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-[#2077f1] py-3 text-center text-white rounded"
                                : "bg-[#0048B0] py-3 text-center text-white rounded hover:bg-[#2077f1]"
                        }
                    >
                        Teacher Request
                    </NavLink>
                    <NavLink
                        to="/admin/userList"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-[#2077f1] py-3 text-center text-white rounded"
                                : "bg-[#0048B0] py-3 text-center text-white rounded hover:bg-[#2077f1]"
                        }
                    >
                        Users
                    </NavLink>
                    <NavLink
                        to="/admin/allClasses"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-[#2077f1] py-3 text-center text-white rounded"
                                : "bg-[#0048B0] py-3 text-center text-white rounded hover:bg-[#2077f1]"
                        }
                    >
                        All Classes
                    </NavLink>
                    <NavLink
                        to="/admin/profile"
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

export default AdminDashboardLayout;