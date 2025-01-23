// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ClassAssignmentsPage = () => {
//     const { id: classId } = useParams();
//     const [assignments, setAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedAssignment, setSelectedAssignment] = useState(null);
//     const [submission, setSubmission] = useState("");

//     useEffect(() => {
//         const fetchAssignments = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/class/${classId}/assignments`);
//                 setAssignments(response.data);
//             } catch (error) {
//                 console.error("Error fetching assignments:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAssignments();
//     }, [classId]);

//     const handleOpenModal = (assignment) => {
//         setSelectedAssignment(assignment);
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setSelectedAssignment(null);
//         setSubmission("");
//     };

//     const handleSubmit = async () => {
//         try {
//             // Increment submission count in the classCollection
//             await axios.patch(`http://localhost:3000/class/${classId}/increment-submission`, {
//                 assignmentId: selectedAssignment._id,
//                 submission,
//             });

//             alert("Submission successful!");
//             handleCloseModal();
//         } catch (error) {
//             console.error("Error submitting assignment:", error);
//             alert("Failed to submit assignment.");
//         }
//     };

//     if (loading) {
//         return <p>Loading assignments...</p>;
//     }

//     if (!assignments.length) {
//         return <p>No assignments found for this class.</p>;
//     }

//     return (
//         <div className="container mx-auto my-10">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold">Class Assignments</h1>
//                 <button className="bg-blue-700 px-4 py-2 text-white rounded hover:bg-blue-600">
//                     Feedback
//                 </button>
//             </div>

//             <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
//                 <thead className="bg-blue-100">
//                     <tr>
//                         <th className="border px-4 py-3 text-left">Title</th>
//                         <th className="border px-4 py-3 text-left">Description</th>
//                         <th className="border px-4 py-3 text-left">Deadline</th>
//                         <th className="border px-4 py-3 text-center">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {assignments.map((assignment) => (
//                         <tr key={assignment._id} className="hover:bg-gray-100">
//                             <td className="border px-4 py-3">{assignment.title}</td>
//                             <td className="border px-4 py-3 truncate max-w-[200px]">
//                                 {assignment.description}
//                             </td>
//                             <td className="border px-4 py-3">{assignment.deadline}</td>
//                             <td className="border px-4 py-3 text-center">
//                                 <button
//                                     className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
//                                     onClick={() => handleOpenModal(assignment)}
//                                 >
//                                     Submit
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[40%]">
//                         <h2 className="text-xl font-semibold mb-4">Submit Assignment</h2>
//                         <div className="mb-4">
//                             <label className="block mb-1">Submission:</label>
//                             <input
//                                 type="text"
//                                 value={submission}
//                                 onChange={(e) => setSubmission(e.target.value)}
//                                 className="w-full p-2 border rounded-md"
//                                 placeholder="Enter submission details"
//                             />
//                         </div>
//                         <div className="flex justify-end gap-4">
//                             <button
//                                 onClick={handleCloseModal}
//                                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ClassAssignmentsPage;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ReactStars from "react-rating-stars-component";

// const ClassAssignmentsPage = () => {
//     const { id: classId } = useParams();
//     const [assignments, setAssignments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
//     const [selectedAssignment, setSelectedAssignment] = useState(null);
//     const [submission, setSubmission] = useState("");
//     const [feedback, setFeedback] = useState({ description: "", rating: 0 });

//     useEffect(() => {
//         const fetchAssignments = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/class/${classId}/assignments`);
//                 setAssignments(response.data);
//             } catch (error) {
//                 console.error("Error fetching assignments:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAssignments();
//     }, [classId]);

//     const handleOpenModal = (assignment) => {
//         setSelectedAssignment(assignment);
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         setSelectedAssignment(null);
//         setSubmission("");
//     };

//     const handleFeedbackModalOpen = () => {
//         setIsFeedbackModalOpen(true);
//     };

//     const handleFeedbackModalClose = () => {
//         setIsFeedbackModalOpen(false);
//         setFeedback({ description: "", rating: 0 });
//     };

//     const handleFeedbackSubmit = async () => {
//         try {
//             await axios.post("http://localhost:3000/feedback", feedback);
//             alert("Feedback submitted successfully!");
//             handleFeedbackModalClose();
//         } catch (error) {
//             console.error("Error submitting feedback:", error);
//             alert("Failed to submit feedback.");
//         }
//     };

//     const handleSubmit = async () => {
//         try {
//             // Increment submission count in the classCollection
//             await axios.patch(`http://localhost:3000/class/${classId}/increment-submission`, {
//                 assignmentId: selectedAssignment._id,
//                 submission,
//             });

//             alert("Submission successful!");
//             handleCloseModal();
//         } catch (error) {
//             console.error("Error submitting assignment:", error);
//             alert("Failed to submit assignment.");
//         }
//     };

//     if (loading) {
//         return <p>Loading assignments...</p>;
//     }

//     if (!assignments.length) {
//         return <p>No assignments found for this class.</p>;
//     }

//     return (
//         <div className="container mx-auto my-10">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold">Class Assignments</h1>
//                 <button
//                     onClick={handleFeedbackModalOpen}
//                     className="bg-blue-700 px-4 py-2 text-white rounded hover:bg-blue-600"
//                 >
//                     Feedback
//                 </button>
//             </div>

//             <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
//                 <thead className="bg-blue-100">
//                     <tr>
//                         <th className="border px-4 py-3 text-left">Title</th>
//                         <th className="border px-4 py-3 text-left">Description</th>
//                         <th className="border px-4 py-3 text-left">Deadline</th>
//                         <th className="border px-4 py-3 text-center">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {assignments.map((assignment) => (
//                         <tr key={assignment._id} className="hover:bg-gray-100">
//                             <td className="border px-4 py-3">{assignment.title}</td>
//                             <td className="border px-4 py-3 truncate max-w-[200px]">
//                                 {assignment.description}
//                             </td>
//                             <td className="border px-4 py-3">{assignment.deadline}</td>
//                             <td className="border px-4 py-3 text-center">
//                                 <button
//                                     className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
//                                     onClick={() => handleOpenModal(assignment)}
//                                 >
//                                     Submit
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Assignment Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[40%]">
//                         <h2 className="text-xl font-semibold mb-4">Submit Assignment</h2>
//                         <div className="mb-4">
//                             <label className="block mb-1">Submission:</label>
//                             <input
//                                 type="text"
//                                 value={submission}
//                                 onChange={(e) => setSubmission(e.target.value)}
//                                 className="w-full p-2 border rounded-md"
//                                 placeholder="Enter submission details"
//                             />
//                         </div>
//                         <div className="flex justify-end gap-4">
//                             <button
//                                 onClick={handleCloseModal}
//                                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Feedback Modal */}
//             {isFeedbackModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[40%]">
//                         <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>
//                         <div className="mb-4">
//                             <label className="block mb-1">Description:</label>
//                             <textarea
//                                 value={feedback.description}
//                                 onChange={(e) =>
//                                     setFeedback((prev) => ({ ...prev, description: e.target.value }))
//                                 }
//                                 className="w-full p-2 border rounded-md"
//                                 rows="4"
//                                 placeholder="Enter your feedback"
//                             ></textarea>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-1">Rating:</label>
//                             <ReactStars
//                                 size={30}
//                                 name="rating"
//                                 starCount={5}
//                                 value={feedback.rating}
//                                 onStarClick={(nextValue) =>
//                                     setFeedback((prev) => ({ ...prev, rating: nextValue }))
//                                 }
//                             />
//                         </div>
//                         <div className="flex justify-end gap-4">
//                             <button
//                                 onClick={handleFeedbackModalClose}
//                                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleFeedbackSubmit}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                             >
//                                 Send Feedback
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ClassAssignmentsPage;

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { AuthContext } from "../../../../provider/AuthProvider";

const ClassAssignmentsPage = () => {
    const { id: classId } = useParams();
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submission, setSubmission] = useState("");
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [feedback, setFeedback] = useState({ description: "", rating: 0 });

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/class/${classId}/assignments`);
                setAssignments(response.data);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, [classId]);

    const handleOpenModal = (assignment) => {
        setSelectedAssignment(assignment);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAssignment(null);
        setSubmission("");
    };

    const handleSubmit = async () => {
        try {
            await axios.patch(`http://localhost:3000/class/${classId}/increment-submission`, {
                assignmentId: selectedAssignment._id,
                submission,
            });

            alert("Submission successful!");
            handleCloseModal();
        } catch (error) {
            console.error("Error submitting assignment:", error);
            alert("Failed to submit assignment.");
        }
    };

    const handleOpenFeedbackModal = () => {
        setIsFeedbackModalOpen(true);
    };

    const handleCloseFeedbackModal = () => {
        setIsFeedbackModalOpen(false);
        setFeedback({ description: "", rating: 0 });
    };

    const handleFeedbackSubmit = async () => {
        try {
            const feedbackData = {
                name: user.displayName,
                photo: user.photoURL,
                description: feedback.description,
                rating: feedback.rating,
            };
            await axios.post("http://localhost:3000/feedback", feedbackData);
            alert("Feedback submitted successfully!");
            handleCloseFeedbackModal();
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback.");
        }
    };

    if (loading) {
        return <p>Loading assignments...</p>;
    }

    if (!assignments.length) {
        return <p>No assignments found for this class.</p>;
    }

    return (
        <div className="container mx-auto my-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Class Assignments</h1>
                <button
                    onClick={handleOpenFeedbackModal}
                    className="bg-blue-700 px-4 py-2 text-white rounded hover:bg-blue-600"
                >
                    Feedback
                </button>
            </div>

            <table className="table-auto w-full border-collapse border border-gray-300 shadow-md">
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
                        <div className="mb-4">
                            <label className="block mb-1">Description:</label>
                            <textarea
                                value={feedback.description}
                                onChange={(e) =>
                                    setFeedback({ ...feedback, description: e.target.value })
                                }
                                className="w-full p-2 border rounded-md"
                                rows="4"
                                placeholder="Enter your feedback"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1">Rating:</label>
                            <ReactStars
                            size={30}
                                name="rating"
                                starCount={5}
                                value={feedback.rating}
                                onStarClick={(nextValue) =>
                                    setFeedback({ ...feedback, rating: nextValue })
                                }
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCloseFeedbackModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFeedbackSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClassAssignmentsPage;
