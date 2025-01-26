import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useTitle from "../../../../hooks/useTitle";

const MyClassPage = () => {

    useTitle('My Class Page');

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient(); // Access the QueryClient instance

    const [page, setPage] = useState(1); // Current page
    const limit = 4; // Number of items per page

    // Fetch classes with pagination
    const { data: classesData, isLoading, isError } = useQuery({
        queryKey: ["classes", user?.email, page],
        queryFn: async () => {
            const response = await axiosSecure.get(
                `classes?email=${user.email}&page=${page}&limit=${limit}`
            );
            return response.data;
        },
        enabled: !!user?.email, // Only run if the user's email is available
    });

    // Delete class mutation
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`classes/${id}`);
        },
        onSuccess: () => {
            Swal.fire("Deleted!", "Your class has been deleted.", "success");
            // Refetch classes after successful deletion
            queryClient.invalidateQueries(["classes", user?.email, page]);
        },
    });

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
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold">Loading classes...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold">Failed to load classes.</p>
            </div>
        );
    }

    const { classes, totalPages } = classesData; // Extract paginated data and total pages

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-4">My Classes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {classes.map((classItem) => (
                    <div
                        key={classItem._id}
                        className="bg-white border shadow-md rounded-lg p-1 flex flex-col"
                    >
                        <img
                            src={classItem.image}
                            alt={classItem.title}
                            className="w-52 h-40 object-cover rounded-md"
                        />
                        <h2 className="text-lg font-semibold">{classItem.title}</h2>
                        <p className="text-gray-600">
                            <strong>Name:</strong> {classItem.teacherInfo.name}
                        </p>
                        <p className="text-gray-600">
                            <strong>Email:</strong> {classItem.teacherInfo.email}
                        </p>
                        <p className="text-gray-600">
                            <strong>Price:</strong> ${classItem.price}
                        </p>
                        <p className="text-sm font-semibold text-yellow-500 mb-1">
                            <strong>Status:</strong> {classItem.status}
                        </p>
                        <div className="flex gap-2 items-center justify-between">
                            <NavLink
                                to={`/teacherDashboard/classUpdate/${classItem._id}`}
                                className="bg-blue-500 text-sm text-white px-2 py-2 rounded-md hover:bg-blue-600"
                            >
                                Update
                            </NavLink>
                            <button
                                onClick={() => handleItemDelete(classItem._id)}
                                className="bg-red-500 text-sm text-white px-2 py-2 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <Link
                                to={`/teacherDashboard/myClass/${classItem._id}`}
                                disabled={classItem.status !== "approved"}
                                className={`px-2 py-2 text-sm rounded-md ${
                                    classItem.status === "approved"
                                        ? "bg-green-500 text-white hover:bg-green-600"
                                        : "bg-gray-400 text-gray-800 cursor-not-allowed"
                                }`}
                            >
                                Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-2 bg-gray-300 rounded-md mr-2 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-3 py-2">{`Page ${page} of ${totalPages}`}</span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-3 py-2 bg-gray-300 rounded-md ml-2 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <Toaster />
        </div>
    );
};

export default MyClassPage;