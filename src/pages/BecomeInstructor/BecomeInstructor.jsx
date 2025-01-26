import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useTitle from "../../hooks/useTitle";

const TeacherApplicationPage = () => {

    useTitle('Teacher Application Page');

    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm();

    const { data: status } = useQuery({
        queryKey: ["status", user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/requests/${user.email}`);
            return response.data.status; // "pending", "approved", "rejected"
        },
        enabled: !!user?.email, // Only fetch if user.email exists
    });

    // Mutation for submitting a new teacher request
    const mutation = useMutation({
        mutationFn: async (teacherData) => {
            return await axiosSecure.post("/requests", teacherData);
        },
        onSuccess: () => {
            toast.success("Request submitted successfully!");
            reset(); // Reset the form fields
            queryClient.invalidateQueries(["status", user?.email]); // Refetch status
        },
    });

    // Mutation for re-requesting another application
    const reRequestMutation = useMutation({
        mutationFn: async (email) => {
            return await axiosSecure.put(`/pending-teacher?email=${email}`);
        },
        onSuccess: () => {
            toast.success("Request sent successfully!");
            queryClient.invalidateQueries(["status", user?.email]); // Refetch status
        },
    });

    const onSubmit = (data) => {
        const teacherData = {
            name: user.displayName,
            image: user.photoURL,
            email: user.email,
            ...data,
            status: "pending",
        };
        mutation.mutate(teacherData);
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
                        onClick={() => reRequestMutation.mutate(user.email)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Request to Another
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
                            value={user?.displayName}
                            readOnly
                            className="p-2 border rounded-md w-full text-center bg-gray-100 cursor-not-allowed"
                        />
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="p-2 border rounded-md w-full text-center bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    {/* Title */}
                    <div className="w-full">
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            placeholder="Enter a title"
                            className="p-2 border rounded-md w-full"
                        />
                    </div>

                    {/* Experience and Category */}
                    <div className="flex flex-col gap-3 w-full">
                        <select
                            {...register("experience", { required: true })}
                            className="p-2 border rounded-md"
                        >
                            <option value="">Select Experience</option>
                            <option value="beginner">Beginner</option>
                            <option value="mid-level">Mid-Level</option>
                            <option value="experienced">Experienced</option>
                        </select>
                        <select
                            {...register("category", { required: true })}
                            className="p-2 border rounded-md"
                        >
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
