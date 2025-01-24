import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyEnrollClass = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1); 
    const pageSize =1; 

    const { data, isLoading, isError } = useQuery({
        queryKey: ["enroll-class", user?.email, page],
        queryFn: async () => {
            const response = await axiosSecure.get(
                `/enroll-class?email=${user.email}&page=${page}&size=${pageSize}`
            );
            return response.data; 
        },
        enabled: !!user?.email, 
        keepPreviousData: true,
    });

    // Show loading state
    if (isLoading) {
        return <p>Loading classes...</p>;
    }

    // Show error state
    if (isError) {
        return <p>Failed to load classes. Please try again later.</p>;
    }

    const { classes = [], totalPages } = data || {};

    return (
        <div className="w-[95%] mx-auto">
            <h1 className="text-2xl font-bold text-center mb-4">Your Enrolled Classes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {classes.map((classItem) => (
                    <div
                        key={classItem.id}
                        className="bg-white border shadow-md rounded-lg p-2 flex flex-col items-center"
                    >
                        {/* Class Image */}
                        <img
                            src={classItem.image}
                            alt={classItem.title}
                            className="object-cover rounded-md mb-2"
                        />

                        {/* Class Title */}
                        <h2 className="text-lg font-semibold mb-2 text-center">{classItem.title}</h2>

                        {/* Class Creator */}
                        <p className="text-gray-600 mb-2 text-center">By: {classItem.teacherInfo.name}</p>

                        {/* Continue Button */}
                        <Link
                            to={`/dashboard/MyEnrollClass/${classItem._id}`}
                            state={{ title: classItem.title }}
                            className="bg-[#0048B0] text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Continue
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 gap-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyEnrollClass;
