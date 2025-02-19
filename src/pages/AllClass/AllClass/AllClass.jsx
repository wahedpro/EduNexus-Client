import { NavLink } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useTitle from "../../../hooks/useTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const AllClass = () => {
    useTitle("All Courses");
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState(null);
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
    });

    if (isLoading) return <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#0048B0]"></div>
    </div>;
    
    if (error) return <p className="text-red-500">Error fetching classes.</p>;

    let { classes, totalClasses } = data;
    if (sortOrder === "asc") {
        classes = [...classes].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
        classes = [...classes].sort((a, b) => b.price - a.price);
    }

    const totalPages = Math.ceil(totalClasses / itemsPerPage);

    return (
        <section className="bg-gray-50 py-16 dark:bg-gray-900">
            <div className="w-[95%] lg:w-[90%] mx-auto">
                <SectionTitle title="All Classes" subTitle="Browse through all approved classes and enroll in the one that suits you best!" />

                <div className="flex gap-3 py-5 justify-end">
                    <button className="px-5 py-2 bg-blue-600" onClick={() => setSortOrder("asc")}>Sort by ascending</button>
                    <button className="px-5 py-2 bg-blue-400" onClick={() => setSortOrder("desc")}>Sort by descending</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {classes.map((classItem) => (
                        <div key={classItem._id} className="bg-white border shadow-md p-2">
                            <img src={classItem.image} alt={classItem.title} className="w-full h-48 object-cover" />
                            <div className="p-3">
                                <h3 className="text-xl font-bold text-gray-900">{classItem.title}</h3>
                                <p className="text-sm text-gray-600">By: {classItem.teacherInfo.name}</p>
                                <p className="text-gray-700 line-clamp-2">{classItem.description}</p>
                                <div className="text-sm text-gray-500">Enrollments: <span className="font-semibold">{classItem.enrollment}</span></div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-[#0048B0]">${classItem.price}</h3>
                                    <NavLink to={`/classDetailsPage/${classItem._id}`} className="bg-[#0048B0] px-10 py-2 text-white hover:bg-[#0c5dcee5]">Enroll</NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center border p-2 my-10">
                    <p className="dark:text-white">
                        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalClasses)} to {Math.min(currentPage * itemsPerPage, totalClasses)} of {totalClasses} results
                    </p>
                    <nav className="flex items-center justify-center gap-2">
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border dark:text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">&lt;</button>
                        {[...Array(totalPages).keys()].map((page) => (
                            <button key={page + 1} onClick={() => setCurrentPage(page + 1)} className={`px-3 py-1 border rounded ${page + 1 === currentPage ? "bg-blue-500 text-white" : ""}`}>{page + 1}</button>
                        ))}
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border dark:text-white rounded disabled:opacity-50 disabled:cursor-not-allowed">&gt;</button>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default AllClass;