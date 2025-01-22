import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const SeeDetailsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();

    const courseId = id; // Course ID from route parameters

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
            await axios.post("http://localhost:3000/assignments", assignmentData);
            toast.success("Assignment added successfully!");
        } catch (error) {
            console.error("Error adding assignment:", error);
            toast.error("Failed to add assignment. Please try again.");
        } finally {
            setIsModalOpen(false); // Close the modal after the process
        }
    };

    return (
        <div className="w-[95%] lg:w-[80%] mx-auto mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Course title</h1>

            {/* Class Progress Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow-md p-4 rounded-lg text-center">
                    <h2 className="text-xl font-semibold mb-2">Total Enrollment</h2>
                    <p className="text-2xl font-bold">10</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg text-center">
                    <h2 className="text-xl font-semibold mb-2">Total Assignments</h2>
                    <p className="text-2xl font-bold">5</p>
                </div>
                <div className="bg-white shadow-md p-4 rounded-lg text-center">
                    <h2 className="text-xl font-semibold mb-2">Total Submissions</h2>
                    <p className="text-2xl font-bold">1</p>
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
