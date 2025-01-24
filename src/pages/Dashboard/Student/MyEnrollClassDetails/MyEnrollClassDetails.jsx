import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { AuthContext } from '../../../../provider/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ClassAssignmentsPage = () => {
    const title = useLocation();
    const courseTitle = title.state.title;
    const { id: classId } = useParams();
    const { user } = useContext(AuthContext);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submission, setSubmission] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [rating, setRating] = useState(0);

    const axiosSecure = useAxiosSecure();

    const { data: assignments, isLoading, error } = useQuery({
        queryKey: ['assignments', classId],
        queryFn: () => axiosSecure.get(`/class/${classId}/assignments`).then(res => res.data),
        onError: (error) => {
            console.error("Error fetching assignments:", error);
        }
    });

    const { mutate: submitAssignment } = useMutation({
        mutationFn: async () => {
            await axiosSecure.patch(`/class/${classId}/increment-submission`, {
                assignmentId: selectedAssignment._id,
                submission,
            });
        },
        onSuccess: () => {
            toast.success("Submission successful!");
            handleCloseModal();
        },
    });

    const handleOpenModal = (assignment) => {
        setSelectedAssignment(assignment);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAssignment(null);
        setSubmission("");
    };

    const handleSubmit = () => {
        submitAssignment();
    };

    const handleOpenFeedbackModal = () => {
        setIsFeedbackModalOpen(true);
    };

    const handleCloseFeedbackModal = () => {
        setIsFeedbackModalOpen(false);
    };

    const handleRatingChange = (newValue) => {
        setRating(newValue);
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const description = form.description.value;
        const name = user.displayName;
        const photo = user.photoURL;
        const title = courseTitle;

        const feedbackData = {
            name,
            photo,
            description,
            title,
            rating,
        };

        await axiosSecure.post('/feedback', feedbackData);
        toast.success('Feedback submitted successfully!');
        handleCloseFeedbackModal();
    };

    if (isLoading) {
        return <p>Loading assignments...</p>;
    }

    if (error) {
        return <p>Error loading assignments</p>;
    }

    return (
        <div className="container mx-auto ">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Class Assignments</h1>
                <button
                    onClick={handleOpenFeedbackModal}
                    className="bg-blue-700 px-4 py-2 text-white rounded hover:bg-blue-600"
                >
                    Feedback
                </button>
            </div>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="border px-4 py-3 text-left">Title</th>
                        <th className="border px-4 py-3 text-left">Description</th>
                        <th className="border px-4 py-3 text-left">Deadline</th>
                        <th className="border px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment) => (
                        <tr key={assignment._id} className="hover:bg-gray-100">
                            <td className="border px-4 py-3">{assignment.title}</td>
                            <td className="border px-4 py-3 truncate max-w-[200px]">
                                {assignment.description}
                            </td>
                            <td className="border px-4 py-3">{assignment.deadline}</td>
                            <td className="border px-4 py-3 text-center">
                                <button
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
                                    onClick={() => handleOpenModal(assignment)}
                                >
                                    Submit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Submit Assignment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[40%]">
                        <h2 className="text-xl font-semibold mb-4">Submit Assignment</h2>
                        <div className="mb-4">
                            <label className="block mb-1">Submission:</label>
                            <input
                                type="text"
                                value={submission}
                                onChange={(e) => setSubmission(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                placeholder="Enter submission details"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {isFeedbackModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[40%]">
                        <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>
                        <form onSubmit={handleFeedbackSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1">Description:</label>
                                <textarea
                                    name="description"
                                    className="w-full p-2 border rounded-md"
                                    rows="4"
                                    placeholder="Enter your feedback"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1">Rating:</label>
                                <ReactStars
                                    size={30}
                                    count={5}
                                    value={rating}
                                    onChange={handleRatingChange}
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleCloseFeedbackModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Submit Feedback
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default ClassAssignmentsPage;
