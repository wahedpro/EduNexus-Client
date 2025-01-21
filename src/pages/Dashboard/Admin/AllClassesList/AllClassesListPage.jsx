import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AllClassesListPage = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/all-classes");
                setClasses(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    const handleApprove = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/admin/approve-class/${id}`);
            if (response.data.modifiedCount > 0) {
                Swal.fire("Success!", "Class has been approved.", "success");
                setClasses((prevClasses) =>
                    prevClasses.map((item) =>
                        item._id === id ? { ...item, status: "approved" } : item
                    )
                );
            }
        } catch (error) {
            console.error("Error approving class:", error);
            Swal.fire("Error!", "Failed to approve class.", "error");
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/admin/reject-class/${id}`);
            if (response.data.modifiedCount > 0) {
                Swal.fire("Success!", "Class has been rejected.", "success");
                setClasses((prevClasses) =>
                    prevClasses.map((item) =>
                        item._id === id ? { ...item, status: "rejected" } : item
                    )
                );
            }
        } catch (error) {
            console.error("Error rejecting class:", error);
            Swal.fire("Error!", "Failed to reject class.", "error");
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading classes...</p>;
    }

    return (
        <div className="w-[95%] mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">All Classes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {classes.map((classItem) => {
                    const { title, image, description, price, status, teacherInfo = {} } = classItem;
                    const { email } = teacherInfo;

                    return (
                        <div key={classItem._id} className="bg-white border shadow-md rounded-lg p-2">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-lg font-semibold mb-2">{title}</h2>
                            <h2 className="mb-2">{email}</h2>
                            <p className="text-gray-600 mb-1 line-clamp-2">
                                <strong>Description:</strong> {description}
                            </p>
                            <p className="text-gray-600 mb-1">
                                <strong>Price:</strong> ${price}
                            </p>
                            <p className="text-sm font-semibold text-yellow-500 mb-4">
                                <strong>Status:</strong> {status}
                            </p>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleApprove(classItem._id)}
                                    disabled={status === "approved"}
                                    className="px-2 py-2 bg-[#0048B0] text-sm text-white disabled:bg-gray-400"
                                >
                                    Approve
                                </button>
                                <button
                                    // onClick={() => handleApprove(classItem._id)}
                                    disabled={status === "rejected"}
                                    className="px-2 py-2 bg-[#0048B0] text-sm text-white disabled:bg-gray-400"
                                >
                                    Class Progress
                                </button>
                                <button
                                    onClick={() => handleReject(classItem._id)}
                                    disabled={status === "rejected"}
                                    className="px-2 py-2 bg-red-500 text-sm text-white disabled:bg-gray-400"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllClassesListPage;
