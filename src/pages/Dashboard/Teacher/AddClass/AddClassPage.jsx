import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useTitle from "../../../../hooks/useTitle";

const AddClassPage = () => {

    useTitle('Add Class Page');

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm(); 
    const axiosSecure = useAxiosSecure();

    // Mutation using TanStack Query
    const mutation = useMutation({
        mutationFn: async (classData) => {
            const response = await axiosSecure.post("/classes", classData);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Class added successfully!");
            navigate("/teacherDashboard/myClass");
        },
    });

    const onSubmit = (data) => {
        const classData = {
            ...data,
            price: parseFloat(data.price),
            status: "pending",
            teacherInfo: {
                name: user.displayName,
                email: user.email,
            },
        };
        mutation.mutate(classData); 
        reset();
    };

    return (
        <div className="w-[95%] mx-auto">
            <h1 className="text-2xl font-bold mb-8">Add New Class</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                {/* Title */}
                <input
                    type="text"
                    {...register("title", { required: true })}
                    placeholder="Enter class title"
                    className="p-3 border rounded-md w-full"
                />

                <div className="flex">
                    {/* Name (Read-only) */}
                    <input
                        type="text"
                        value={user.displayName}
                        readOnly
                        className="p-3 border rounded-md w-full bg-gray-100 cursor-not-allowed"
                    />

                    {/* Email (Read-only) */}
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="p-3 border rounded-md w-full bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Price */}
                <input
                    type="number"
                    {...register("price", { required: true })}
                    placeholder="Enter class price"
                    className="p-3 border rounded-md w-full"
                />

                {/* Description */}
                <textarea
                    {...register("description", { required: true })}
                    placeholder="Enter class description"
                    className="p-3 border rounded-md w-full"
                    rows="4"
                ></textarea>

                {/* Image */}
                <input
                    type="text"
                    {...register("image", { required: true })}
                    placeholder="Enter image URL"
                    className="p-3 border rounded-md w-full"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={mutation.isLoading}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    {mutation.isLoading ? "Adding..." : "Add Class"}
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default AddClassPage;
