
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const TeacherRequestPage = () => {
    const teacherRequests = useLoaderData();

    const handleApprove = async (email) => {
        try {
            const response = await axios.put(`http://localhost:3000/approve-teacher?email=${email}`);
            if (response.status === 200) {
                toast.success("User approved successfully!");
            }
        } catch (error) {
            console.error("Error approving user:", error);
            toast.error("Failed to approve user.");
        }
    };

    const handleReject = async (email) => {
        try {
            const response = await axios.put(`http://localhost:3000/reject-teacher?email=${email}`);
            if (response.status === 200) {
                toast.success("User approved successfully!");
            }
        } catch (error) {
            console.error("Error approving user:", error);
            toast.error("Failed to approve user.");
        }
    };
    

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
                        {teacherRequests.map((request) => (
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
        </div>
    );
};

export default TeacherRequestPage;
