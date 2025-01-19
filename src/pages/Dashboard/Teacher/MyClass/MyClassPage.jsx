import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../../provider/AuthProvider";

const MyClassPage = () => {
    const {user} = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/classes?email=${user.email}`);
                setClasses(response.data);
            } catch (error) {
                console.error("Error fetching classes:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchClasses(); // Only fetch if email is available
        }
    }, [user?.email]);

    const handleItemDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // Delete from the database
                fetch(`http://localhost:3000/classes/${id}`, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            // Update the classes state to reflect the deletion
                            setClasses((prevClasses) => prevClasses.filter((item) => item._id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success",
                            });
                        }
                    });
            }
        });
    };
    

    const handleSeeDetails = (id) => {
        navigate(`/dashboard/my-class/${id}`);
    };

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

                            <NavLink to={`/teacherDashboard/classUpdate/${classItem._id}`}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Update</NavLink>

                            <button onClick={() => handleItemDelete(classItem._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            > Delete </button>

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
