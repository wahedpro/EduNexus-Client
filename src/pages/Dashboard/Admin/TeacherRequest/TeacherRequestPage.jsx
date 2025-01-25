import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const fetchTeacherRequests = async (page = 1, limit = 10) => {
    const { data } = await axios.get('https://y-five-lemon.vercel.app/requests', {
        params: { page, limit }
    });
    return data;
};

const TeacherRequestPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6;
    const queryClient = useQueryClient(); // Access the query client

    const { data: teacherRequests, isLoading, isError, error } = useQuery({
        queryKey: ['teacherRequests', currentPage, limit],
        queryFn: () => fetchTeacherRequests(currentPage, limit),
        keepPreviousData: true,
    });

    const handleApprove = async (email) => {
        try {
            const response = await axios.put(`https://y-five-lemon.vercel.app/approve-teacher?email=${email}`);
            if (response.status === 200) {
                toast.success("User approved successfully!");
                queryClient.invalidateQueries(['teacherRequests']); // Invalidate cache to refetch data
            }
        } catch (error) {
            console.error("Error approving user:", error);
            toast.error("Failed to approve user.");
        }
    };

    const handleReject = async (email) => {
        try {
            const response = await axios.put(`https://y-five-lemon.vercel.app/reject-teacher?email=${email}`);
            if (response.status === 200) {
                toast.success("User rejected successfully!");
                queryClient.invalidateQueries(['teacherRequests']); // Invalidate cache to refetch data
            }
        } catch (error) {
            console.error("Error rejecting user:", error);
            toast.error("Failed to reject user.");
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="max-w-6xl mx-auto mt-10">
            <h1 className="text-3xl font-bold text-center mb-6">Teacher Requests</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-left">Name</th>
                            <th className="border px-4 py-2 text-left">Image</th>
                            <th className="border px-4 py-2 text-left">Experience</th>
                            <th className="border px-4 py-2 text-left">Title</th>
                            <th className="border px-4 py-2 text-left">Category</th>
                            <th className="border px-4 py-2 text-left">Status</th>
                            <th className="border px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacherRequests?.map((request) => (
                            <tr key={request._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{request.name}</td>
                                <td className="border px-4 py-2">
                                    <img
                                        src={request.image}
                                        alt={request.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                </td>
                                <td className="border px-4 py-2">{request.experience}</td>
                                <td className="border px-4 py-2">{request.title}</td>
                                <td className="border px-4 py-2">{request.category}</td>
                                <td className="border px-4 py-2 text-yellow-500 font-semibold">{request.status}</td>
                                <td className="border px-4 py-2 flex gap-2">
                                    <button
                                        onClick={() => handleApprove(request.email)}
                                        disabled={request.status === "rejected"}
                                        className={`px-4 py-2 rounded-md ${
                                            request.status === "rejected"
                                                ? "bg-gray-400 text-white cursor-not-allowed"
                                                : "bg-green-500 text-white hover:bg-green-600"
                                        }`}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(request.email)}
                                        disabled={request.status === "rejected"}
                                        className={`px-4 py-2 rounded-md ${
                                            request.status === "rejected"
                                                ? "bg-gray-400 text-white cursor-not-allowed"
                                                : "bg-red-500 text-white hover:bg-red-600"
                                        }`}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-between">
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Previous
                </button>
                <button 
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TeacherRequestPage;
