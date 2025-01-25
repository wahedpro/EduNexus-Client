import { useEffect, useState } from "react"; 
import toast from "react-hot-toast";
import { useLoaderData, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const SeeDetailsPage = () => {
    const classes = useLoaderData();
    const { enrollment, submission } = classes; 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [totalAssignment, setTotalAssignment] = useState(classes.totalAssignment);
    const { id } = useParams();

    const axiosSecure= useAxiosSecure();

    const courseId = id;

    const [ModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const openModal = (description) => {
        setModalContent(description);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalContent("");
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const deadline = form.deadline.value;

        // Create assignment data object
        const assignmentData = {
            classId: courseId, // Include courseId as classId
            assignment: {
                title,
                description,
                deadline,
            },
        };

        try {
            // Add the assignment to the database
            await axiosSecure.post("http://localhost:3000/assignments", assignmentData);
            toast.success("Assignment added successfully!");

            // Update assignments state and increment totalAssignment
            setAssignments((prevAssignments) => [
                ...prevAssignments,
                assignmentData.assignment,
            ]);
            setTotalAssignment((prevCount) => prevCount + 1); // Increment totalAssignment
        } catch (error) {
            console.error("Error adding assignment:", error);
            toast.error("Failed to add assignment. Please try again.");
        } finally {
            setIsModalOpen(false); // Close the modal after the process
        }
    };

    // Get all assignments
    useEffect(() => {
        const fetchAssignments = async () => {
            const response = await fetch(`http://localhost:3000/course/${courseId}/assignments`);
            const data = await response.json();
            setAssignments(data);
        };
        fetchAssignments();
    }, [courseId]);

    return (
        <div className="w-[95%] mx-auto">
            <h1 className="text-2xl font-bold text-center mb-5">Course title</h1>

            {/* Class Progress Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow-md p-4 rounded-lg text-center">
                    <h2 className="text-xl font-semibold mb-2">Total Enrollment</h2>
                    <p className="text-2xl font-bold">{enrollment}</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg text-center">
                    <h2 className="text-xl font-semibold mb-2">Total Assignments</h2>
                    <p className="text-2xl font-bold">{totalAssignment}</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg text-center">
                    <h2 className="text-xl font-semibold mb-2">Total Submissions</h2>
                    <p className="text-2xl font-bold">{submission}</p>
                </div>
            </div>

            {/* Create Assignment Button */}
            <div className="text-right mb-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Create Assignment
                </button>
            </div>

            <div className="relative">
                {assignments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Deadline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments.map((assignment, index) => (
                                    <tr
                                        key={assignment._id}
                                        className={`${
                                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-gray-100 transition-colors`}
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                            {assignment.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="line-clamp-1">
                                                {assignment.description.length > 50 ? (
                                                    <>
                                                        {assignment.description.slice(0, 50)}...
                                                        <button
                                                            onClick={() => openModal(assignment.description)}
                                                            className="text-blue-600 hover:text-blue-800 ml-2 text-xs font-semibold"
                                                        >
                                                            Read More
                                                        </button>
                                                    </>
                                                ) : (
                                                    assignment.description
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {assignment.deadline}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-4">No assignments found.</p>
                )}

                {/* Modal */}
                {ModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 p-6">
                            <h2 className="text-xl font-bold mb-4">Assignment Description</h2>
                            <p className="text-gray-700 mb-6">{modalContent}</p>
                            <button
                                onClick={closeModal}
                                className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Assignment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-[90%] md:w-[50%]">
                        <h2 className="text-xl font-semibold mb-4">Create Assignment</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    className="w-full p-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Description</label>
                                <textarea
                                    name="description"
                                    className="w-full p-2 border rounded-md"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    Add Assignment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeeDetailsPage;
