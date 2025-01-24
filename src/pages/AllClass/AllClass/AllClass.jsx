import { NavLink } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useTitle from "../../../hooks/useTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const AllClass = () => {
    // for the title
    useTitle("All Courses");

    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const fetchApprovedClasses = async ({ queryKey }) => {
        const page = queryKey[1];
        const limit = queryKey[2];
        const { data } = await axiosSecure.get(`/allClasses?page=${page}&limit=${limit}`);
        return data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["approvedClasses", currentPage, itemsPerPage],
        queryFn: fetchApprovedClasses,
    }
    );

    if (isLoading) return <p>Loading classes...</p>;
    if (error) return <p className="text-red-500">Error fetching classes.</p>;

    const { classes, totalClasses } = data; // Assuming API returns classes and total count

    const totalPages = Math.ceil(totalClasses / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const visiblePages = [];
        const rangeStart = Math.max(1, currentPage - 2);
        const rangeEnd = Math.min(totalPages, currentPage + 2);

        for (let i = rangeStart; i <= rangeEnd; i++) {
            visiblePages.push(i);
        }

        return (
            <nav className="flex items-center justify-center gap-2 border">
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    &lt;
                </button>

                {/* First Page */}
                {currentPage > 3 && (
                    <>
                        <button
                            onClick={() => handlePageChange(1)}
                            className="px-3 py-1 border rounded"
                        >
                            1
                        </button>
                        <span className="px-3 py-1">...</span>
                    </>
                )}

                {/* Middle Pages */}
                {visiblePages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 border rounded ${page === currentPage ? "bg-blue-500 text-white" : ""
                            }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Last Page */}
                {currentPage < totalPages - 2 && (
                    <>
                        <span className="px-3 py-1">...</span>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            className="px-3 py-1 border rounded"
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    &gt;
                </button>
            </nav>
        );
    };

    return (
        <section className="bg-gray-50">
            <div className="w-[95%] lg:w-[90%] mx-auto">
                <SectionTitle
                    title="All Classes"
                    subTitle="Browse through all approved classes and enroll in the one that suits you best!"
                ></SectionTitle>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {classes.map((classItem) => (
                        <div
                            key={classItem._id}
                            className="bg-white border shadow-md overflow-hidden"
                        >
                            <img
                                src={classItem.image}
                                alt={classItem.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-3">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {classItem.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    By: {classItem.teacherInfo.name}
                                </p>
                                <p className="text-gray-700 line-clamp-2">
                                    {classItem.description}
                                </p>
                                <div className="text-sm text-gray-500">
                                    Enrollments: <span className="font-semibold">{classItem.enrollment}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-[#0048B0]">${classItem.price}</h3>
                                    <NavLink
                                        to={`/classDetailsPage/${classItem._id}`}
                                        className="bg-[#0048B0] px-10 py-2 text-white hover:bg-[#0c5dcee5]"
                                    >
                                        Enroll
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Results Summary */}
                <div className="flex justify-between items-center border p-2 my-10">
                    <p>
                        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalClasses)} to{" "}
                        {Math.min(currentPage * itemsPerPage, totalClasses)} of {totalClasses} results
                    </p>
                    {/* Pagination */}
                    {renderPagination()}
                </div>
            </div>
        </section>
    );
};

export default AllClass;
