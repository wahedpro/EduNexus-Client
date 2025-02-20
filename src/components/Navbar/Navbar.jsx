import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useRole from "../../hooks/useRole";
import { IoMdMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";


const Navbar = () => {
    const { user, userLogout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [role] = useRole();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleLogout = () => {
        userLogout()
            .then(() => {
                navigate("/login");
            })
            .catch((err) => console.error(err));
    };

    const handleDashboardClick = () => {
        setDropdownOpen(false);
        if (role === "student") {
            navigate("/dashboard");
        } else if (role === "teacher") {
            navigate("/teacherDashboard");
        } else if (role === "admin") {
            navigate("/admin");
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

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
        <div className="w-full px-4 lg:px-16 mx-auto bg-white border-b-2 dark:border-gray-600 fixed z-50 dark:bg-gray-900">
            <div className="flex items-center justify-between py-4">
                <NavLink to="/" className="text-[#0048B0] text-xl lg:text-2xl font-bold dark:text-white">
                    EduNexus
                </NavLink>
                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-4">
                    <NavLink to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#0048B0] font-semibold border-b-2 border-[#0048B0] dark:text-white"
                                : "text-gray-700 hover:text-[#0048B0] dark:text-white"
                        }>Home</NavLink>
                    <NavLink to="/AllClass"
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#0048B0] font-semibold border-b-2 border-[#0048B0] dark:text-white"
                                : "text-gray-700 hover:text-[#0048B0] dark:text-white"
                        }>All Classes</NavLink>
                    <NavLink to="/becomeInstructor"
                        className={({ isActive }) =>
                            isActive
                                ? "text-[#0048B0] font-semibold border-b-2 border-[#0048B0] dark:text-white"
                                : "text-gray-700 hover:text-[#0048B0] dark:text-white"
                        }>Teach on EduNexus</NavLink>
                </div>
                {/* Mobile Hamburger Menu */}
                <div className="lg:hidden flex items-center gap-2">
                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="p-2 bg-gray-200 dark:bg-gray-800 rounded lg:block"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                    {user ? (
                        <div>
                            <img
                                className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
                                src={user.photoURL}
                                alt="User Profile"
                                title={user.displayName}
                                onClick={toggleDropdown}
                            />
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10">
                                    <h4 className="text-left px-4 py-2 text-sm border-b">{user.displayName}</h4>
                                    <button onClick={handleDashboardClick} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Dashboard</button>
                                    <button
                                        onClick={handleLogout}
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
                                className="border bg-[#0048B0] border-[#0048B0] px-5 py-2 text-white hover:bg-white hover:text-black"
                            >
                                Sign In
                            </NavLink>
                        </div>
                    )}
                    <button onClick={() => setMobileMenuOpen((prev) => !prev)} className="text-[#0048B0]">
                        {mobileMenuOpen ? <IoIosClose size={24} /> : <IoMdMenu size={24} />}
                    </button>
                    {mobileMenuOpen && (
                        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg z-10">
                            <NavLink to="/" className="block px-4 py-2 hover:bg-gray-100">Home</NavLink>
                            <NavLink to="/AllClass" className="block px-4 py-2 hover:bg-gray-100">All Classes</NavLink>
                            <NavLink to="/becomeInstructor" className="block px-4 py-2 hover:bg-gray-100">Teach on EduNexus</NavLink>
                        </div>
                    )}
                </div>
                <div className="relative  lg:flex hidden items-center gap-3" >
                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="p-2 bg-gray-200 dark:bg-gray-800 rounded hidden lg:block"
                    >
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                    {user ? (
                        <div>
                            <img
                                className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
                                src={user.photoURL}
                                alt="User Profile"
                                title={user.displayName}
                                onClick={toggleDropdown}
                            />
                            {dropdownOpen && (
                                <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                                    <h4 className="text-left px-4 py-2 text-sm border-b">{user.displayName}</h4>
                                    <button onClick={handleDashboardClick} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                        Dashboard
                                    </button>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                        Logout
                                    </button>
                                </div>
                            )}

                        </div>
                    ) : (
                        <div>
                            <NavLink
                                to="/Login"
                                className="border bg-[#0048B0] border-[#0048B0] px-5 py-2 text-white hover:bg-white hover:text-black"
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