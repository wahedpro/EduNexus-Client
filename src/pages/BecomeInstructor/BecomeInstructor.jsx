import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const TeacherApplicationPage = () => {
    const { user } = useContext(AuthContext);
    const [status, setStatus] = useState(null); // "pending", "approved", "rejected"
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

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

    const onSubmit = async (data) => {
        setLoading(true);

        const applicationData = {
            ...data,
            image: user.photoURL,
            email: user.email,
            status: "pending", // Default status
        };

        try {
            await axios.post("http://localhost:3000/requests", applicationData);
            setStatus("pending");
            toast.success("Your application has been submitted for review.");
            reset(); // Reset the form fields
        } catch (error) {
            console.error("Error submitting application:", error);
            toast.error("Failed to submit your application.");
        } finally {
            setLoading(false);
        }
    };

    const handleRequestAnother = async () => {
        setLoading(true);

        try {
            await axios.patch(`http://localhost:3000/requests/${user.email}`, {
                status: "pending",
            });
            setStatus("pending");
            toast.success("Your request has been submitted for review again.");
        } catch (error) {
            console.error("Error re-requesting application:", error);
            toast.error("Failed to submit your request again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[95%] lg:w-[50%] mx-auto my-10 py-10 border px-5 shadow-sm">
            <h1 className="text-2xl font-semibold text-center mb-5">Apply for Teaching Position</h1>

            {user?.role === "teacher" ? (
                <p className="text-center text-green-500 font-semibold">
                    You are already approved as a teacher. This form is no longer accessible.
                </p>
            ) : status === "pending" ? (
                <p className="text-center text-yellow-500 font-semibold">
                    Your application is under review. Please wait for admin approval.
                </p>
            ) : status === "approved" ? (
                <p className="text-center text-green-500 font-semibold">
                    Congratulations! Your application has been approved. You are now a teacher.
                </p>
            ) : status === "rejected" ? (
                <div className="text-center">
                    <p className="text-red-500 font-semibold mb-4">
                        Your application was rejected. Please request again if needed.
                    </p>
                    <button
                        onClick={handleRequestAnother}
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        {loading ? "Requesting..." : "Request to Another"}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6">
                    {/* Profile Image */}
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
                            defaultValue={user?.displayName}
                            className="p-2 border rounded-md w-full text-center bg-gray-100"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                        <input
                            type="email"
                            defaultValue={user?.email }
                            readOnly
                            className="p-2 border rounded-md w-full text-center bg-gray-100 cursor-not-allowed"
                            {...register("email")}
                        />
                    </div>

                    {/* Title */}
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Enter a title"
                            className="p-2 border rounded-md w-full"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>

                    {/* Experience and Category */}
                    <div className="flex flex-col gap-3 w-full">
                        <select
                            className="p-2 border rounded-md"
                            {...register("experience", { required: "Experience is required" })}
                        >
                            <option value="">Select Experience</option>
                            <option value="beginner">Beginner</option>
                            <option value="mid-level">Mid-Level</option>
                            <option value="experienced">Experienced</option>
                        </select>
                        {errors.experience && <p className="text-red-500">{errors.experience.message}</p>}

                        <select
                            className="p-2 border rounded-md"
                            {...register("category", { required: "Category is required" })}
                        >
                            <option value="">Select Category</option>
                            <option value="web development">Web Development</option>
                            <option value="digital marketing">Digital Marketing</option>
                            <option value="graphic design">Graphic Design</option>
                            <option value="data science">Data Science</option>
                            <option value="cybersecurity">Cybersecurity</option>
                        </select>
                        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                    >
                        {loading ? "Submitting..." : "Submit for Review"}
                    </button>
                </form>
            )}
            <Toaster />
        </div>
    );
};

export default TeacherApplicationPage;