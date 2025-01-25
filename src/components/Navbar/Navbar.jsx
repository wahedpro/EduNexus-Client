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
        <div className="w-full px-4 lg:px-10 mx-auto">
            <div className="flex items-center justify-between py-4">
                <NavLink to="/" className="text-[#0048B0] text-xl lg:text-2xl font-bold">
                    EduNexus
                </NavLink>
                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-4">
                    <NavLink to="/" className="hover:text-[#0048B0]">Home</NavLink>
                    <NavLink to="/AllClass" className="hover:text-[#0048B0]">All Classes</NavLink>
                    <NavLink to="/becomeInstructor" className="hover:text-[#0048B0]">Teach on EduNexus</NavLink>
                </div>
                {/* Mobile Hamburger Menu */}
                <div className="lg:hidden">
                    <button onClick={() => setMobileMenuOpen((prev) => !prev)} className="text-[#0048B0]">
                        {mobileMenuOpen ? <IoIosClose size={24} /> : <IoMdMenu  size={24} />}
                    </button>
                    {mobileMenuOpen && (
                        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg z-10">
                            <NavLink to="/" className="block px-4 py-2 hover:bg-gray-100">Home</NavLink>
                            <NavLink to="/AllClass" className="block px-4 py-2 hover:bg-gray-100">All Classes</NavLink>
                            <NavLink to="/becomeInstructor" className="block px-4 py-2 hover:bg-gray-100">Teach on EduNexus</NavLink>
                        </div>
                    )}
                </div>
                <div className="relative" ref={dropdownRef}>
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
