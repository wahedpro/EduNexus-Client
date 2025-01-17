import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MyClassPage = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();

    // Fetch the teacher's classes
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/my-classes");
                setClasses(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold">Loading classes...</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8">My Classes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {classes.map((classItem) => (
                    <div
                        key={classItem._id}
                        className="bg-white border shadow-md rounded-lg p-1 flex flex-col"
                    >
                        {/* Class Image */}
                        <img
                            src={classItem.image}
                            alt={classItem.title}
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />

                        {/* Class Details */}
                        <h2 className="text-lg font-semibold mb-2">{classItem.title}</h2>
                        <p className="text-gray-600 mb-1">
                            <strong>Name:</strong> {classItem.teacherInfo.name}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Email:</strong> {classItem.teacherInfo.email}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <strong>Price:</strong> ${classItem.price}
                        </p>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                            <strong>Description:</strong> {classItem.description}
                        </p>
                        <p className="text-sm font-semibold text-yellow-500 mb-4">
                            <strong>Status:</strong> {classItem.status}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleUpdate(classItem._id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(classItem._id)}
                                disabled={deleting}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                            <button
                                onClick={() => handleSeeDetails(classItem._id)}
                                disabled={classItem.status !== "approved"}
                                className={`px-4 py-2 rounded-md ${classItem.status === "approved"
                                        ? "bg-green-500 text-white hover:bg-green-600"
                                        : "bg-gray-400 text-gray-800 cursor-not-allowed"
                                    }`}
                            >
                                See Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Toaster />
        </div>
    );
};

export default MyClassPage;
