import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const TeacherApplicationPage = () => {
    const { user } = useContext(AuthContext);
    
    const [status, setStatus] = useState(null); // "pending", "approved", "rejected"
    // const [loading, setLoading] = useState(false);

    // Fetch the current application status
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/requests/${user.email}`);
                setStatus(response.data.status); // "pending", "approved", "rejected"
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        };
        if (user?.email) fetchStatus();
    }, [user]);

    const submitTeacherRequest = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // setLoading(true); // Start loading state
    
        const form = e.target;
        const name = user.displayName;
        const image = user.photoURL;
        const email = user.email;
        const title = form.title.value;
        const experience = form.experience.value;
        const category = form.category.value;
        const status = 'pending';
    
        // Create teacher data object
        const teacherData = {
            name,
            image,
            email,
            title,
            experience,
            category,
            status,
        };
    
        console.log(teacherData); // Debugging the data object
    
        try {
            // Add the class to the database
            await axios.post("http://localhost:3000/requests", teacherData);
            // toast.success("Class added successfully!");
            // navigate("/teacherDashboard/myClass"); // Redirect to My Classes Page
        } catch (error) {
            console.error("Error adding class:", error);
            // toast.error("Failed to add class. Please try again.");
        } finally {
            console.error("Error adding class:");
            // setLoading(false);
        }
    };

    const handleRequestAnother = async (email) => {
        try {
            const response = await axios.put(`http://localhost:3000/pending-teacher?email=${email}`);
            if (response.status === 200) {
                toast.success("User approved successfully!");
            }
        } catch (error) {
            console.error("Error approving user:", error);
            toast.error("Failed to approve user.");
        }
    };
    

    return (
        <div className="w-[60%] mx-auto py-24">
            {status === "approved" ? (
                <p className="text-green-500 text-center font-semibold">
                    Congratulations! Your application has been approved. You are now a teacher.
                </p>
            ) : status === "pending" ? (
                <p className="text-yellow-500 text-center font-semibold">
                    Your application is under review. Please wait for admin approval.
                </p>
            ) : status === "rejected" ? (
                <div className="text-center">
                    <p className="text-red-500 font-semibold mb-4">
                        Your application was rejected. You can request a review again.
                    </p>
                    <button
                        onClick={handleRequestAnother(user.email)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Request to Another
                    </button>
                </div>
            ) : (
                <form onSubmit={submitTeacherRequest} className="flex flex-col gap-6">
                    {/* User Image */}
                    <div className="flex flex-col items-center">
                        <img
                            src={user?.photoURL}
                            alt="User Profile"
                            className="w-24 h-24 rounded-full border mb-2"
                        />
                    </div>

                    {/* Name and Email */}
                    <div className="flex flex-col items-center gap-2 w-full">
                        <input
                            type="text"
                            name="name"
                            defaultValue={user?.displayName}
                            readOnly
                            className="p-2 border rounded-md w-full text-center bg-gray-100 cursor-not-allowed"
                        />
                        <input
                            type="email"
                            name="email"
                            defaultValue={user?.email}
                            readOnly
                            className="p-2 border rounded-md w-full text-center bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Title */}
                    <div className="w-full">
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter a title"
                            className="p-2 border rounded-md w-full"
                            required
                        />
                    </div>

                    {/* Experience and Category */}
                    <div className="flex flex-col gap-3 w-full">
                        <select name="experience" className="p-2 border rounded-md" required>
                            <option value="">Select Experience</option>
                            <option value="beginner">Beginner</option>
                            <option value="mid-level">Mid-Level</option>
                            <option value="experienced">Experienced</option>
                        </select>
                        <select name="category" className="p-2 border rounded-md" required>
                            <option value="">Select Category</option>
                            <option value="web development">Web Development</option>
                            <option value="digital marketing">Digital Marketing</option>
                            <option value="graphic design">Graphic Design</option>
                            <option value="data science">Data Science</option>
                            <option value="cybersecurity">Cybersecurity</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        // disabled={loading}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Submit for Review
                    </button>
                </form>
            )}
        </div>
    );

};

export default TeacherApplicationPage;