import {useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchAllItems = async () => {
            const { data } = await axios.get(`http://localhost:3000/allUser?search=${search}`);
            setUsers(data); 
            setLoading(false);
        };
        fetchAllItems();
    }, [search]);

    const handleMakeAdmin = async (email) => {
        try {
            const response = await axios.put(`http://localhost:3000/make-admin?email=${email}`);
            if (response.status === 200) {
                toast.success("User approved successfully!");
            }
        } catch (error) {
            console.error("Error approving user:", error);
            toast.error("Failed to approve user.");
        }
    };

    // Display loading message while fetching data
    if (loading) {
        return <p className="text-center mt-10">Loading users...</p>;
    }

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
                            <td className="border px-4 py-2 capitalize">{user.role || "user"}</td>
                            <td className="border px-4 py-2">
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full mx-auto"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                {user.role === "admin" ? (
                                    <button
                                        disabled
                                        className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
                                    >
                                        Admin
                                    </button>
                                ) : (
                                    <button
                                    onClick={()=>handleMakeAdmin(user.email)}
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
        </div>
    );
};

export default UsersPage;