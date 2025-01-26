import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useTitle from "../../../../hooks/useTitle";

const UsersPage = () => {

    useTitle('List of User');

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);  // Current page number
    const [totalUsers, setTotalUsers] = useState(0);  // Total users count
    const [roleStatus, setRoleStatus] = useState({});  // State to track role change for each user
    const usersPerPage = 5;

    useEffect(() => {
        setLoading(true);
        const fetchAllItems = async () => {
            const { data } = await axios.get(`https://y-five-lemon.vercel.app/allUser?search=${search}&page=${currentPage}&limit=${usersPerPage}`);
            setUsers(data.users);
            setTotalUsers(data.totalUsers);
            setLoading(false);
        };
        fetchAllItems();
    }, [search, currentPage]);

    const handleMakeAdmin = async (email, userId) => {
        try {
            const response = await axios.put(`https://y-five-lemon.vercel.app/make-admin?email=${email}`);
            if (response.status === 200) {
                toast.success("User role updated successfully!");
                setRoleStatus(prevState => ({ ...prevState, [userId]: "admin" })); // Update the role to "admin"
            }
        } catch (error) {
            console.error("Error updating user role:", error);
            toast.error("Failed to update user role.");
        }
    };

    // Display loading message while fetching data
    if (loading) {
        return <p className="text-center mt-10">Loading users...</p>;
    }

    // Pagination logic
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="w-[95%] lg:w-[80%] mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Manage Users</h1>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    onBlur={e => setSearch(e.target.value)}
                    placeholder="Search by email"
                    className="w-full p-2 border rounded-md"
                />
            </div>

            {/* Users Table */}
            <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="text-center">
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2 capitalize">
                                {roleStatus[user._id] || user.role || "user"}
                            </td>
                            <td className="border px-4 py-2">
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full mx-auto"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                {user.role === "admin" || roleStatus[user._id] === "admin" ? (
                                    <button
                                        disabled
                                        className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
                                    >
                                        Admin
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleMakeAdmin(user.email, user._id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Make Admin
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
                <button
                    className="px-4 py-2 mx-2 border rounded bg-[#0048B0] text-white disabled:bg-slate-400"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="my-auto">Page {currentPage} of {totalPages}</span>
                <button
                    className="px-4 py-2 mx-2 border rounded bg-[#0048B0] text-white  disabled:bg-slate-400"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersPage;

