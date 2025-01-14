import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="w-[95%] lg:w-[90%] mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-[#0048B0] text-2xl font-bold py-4">EduNexus</h1>
                <div className="flex items-center gap-4">
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/'>All Classes</NavLink>
                    <NavLink to='/'>Teach on EduNexus</NavLink>
                </div>
                <div>
                    <NavLink className="border border-[#0048B0] px-5 py-2 text-[#0048B0] hover:bg-gray-100">Sign In</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
