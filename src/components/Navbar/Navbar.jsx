import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
    const { user, userLogout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        userLogout()
            .then(() => {
                navigate("/login");
            })
            .catch((err) => console.error(err));
    };

    const handleDashboardClick = () => {
        setDropdownOpen(false); 
        navigate("/dashboard");
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-[95%] lg:w-[90%] mx-auto">
            <div className="flex items-center justify-between">
                <NavLink to="/" className="text-[#0048B0] text-2xl font-bold py-4">
                    EduNexus
                </NavLink>
                <div className="flex items-center gap-4">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/AllClass">All Classes</NavLink>
                    <NavLink to="/becomeInstructor">Teach on EduNexus</NavLink>
                    <NavLink to="/teacherDashboard">Teacher Dashboard</NavLink>
                </div>
                <div className="relative" ref={dropdownRef}>
                    {user ? (
                        <div>
                            <img
                                className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
                                src={user.photoURL}
                                alt="User Profile"
                                title={user.displayName}
                                onClick={toggleDropdown} // Toggle dropdown on click
                            />
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                                    <h4 className="text-left px-4 py-2 text-sm border-b">{user.displayName}</h4>
                                    <button
                                        onClick={handleDashboardClick} // Close dropdown and navigate
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        onClick={handleLogout} // Logout user
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <NavLink
                                to="/Login"
                                className="border border-[#0048B0] px-5 py-2 text-[#0048B0] hover:bg-gray-100"
                            >
                                Sign In
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;