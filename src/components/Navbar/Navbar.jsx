import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="w-[95%] lg:w-[90%] mx-auto">
            <div className="flex items-center justify-between">
                <NavLink to='/' className="text-[#0048B0] text-2xl font-bold py-4">EduNexus</NavLink>
                <div className="flex items-center gap-4">
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/AllClass'>All Classes</NavLink>
                    <NavLink to='/'>Teach on EduNexus</NavLink>
                </div>
                <div>
                    <NavLink to='/Login' className="border border-[#0048B0] px-5 py-2 text-[#0048B0] hover:bg-gray-100">Sign In</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
