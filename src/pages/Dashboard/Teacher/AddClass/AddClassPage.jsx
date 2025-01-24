import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../../provider/AuthProvider";

const AddClassPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const price = parseFloat(form.price.value);
        const image = e.target.image.value;
        const status = 'pending';

        const teacherInfo = {
            name: user.displayName,
            email: user.email,
        }

        // Create plant data object
        const classData = {
            title,
            description,
            price,
            image,
            status,
            teacherInfo,
        }

        try {
            // Add the class to the database
            await axios.post("http://localhost:3000/classes", classData);
            toast.success("Class added successfully!");
            navigate("/teacherDashboard/myClass"); // Redirect to My Classes Page
        } catch (error) {
            console.error("Error adding class:", error);
            toast.error("Failed to add class. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[95%] lg:w-[50%] mx-auto">
            <h1 className="text-2xl font-bold mb-8">Add New Class</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Enter class title"
                    required
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
                    name="price"
                    placeholder="Enter class price"
                    required
                    className="p-3 border rounded-md w-full"
                />

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Enter class description"
                    required
                    className="p-3 border rounded-md w-full"
                    rows="4"
                ></textarea>

                {/* Image */}
                <input
                    type="text"
                    name="image"
                    placeholder="Enter image URL"
                    required
                    className="p-3 border rounded-md w-full"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    {loading ? "Adding..." : "Add Class"}
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default AddClassPage;

// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import toast, { Toaster } from "react-hot-toast";
// import { AuthContext } from "../../../../provider/AuthProvider";

// const AddClassPage = () => {
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const { register, handleSubmit, reset } = useForm(); // Initialize React Hook Form

//     // Mutation using TanStack Query
//     const mutation = useMutation({
//         mutationFn: async (classData) => {
//             const response = await axios.post("http://localhost:3000/classes", classData);
//             return response.data;
//         },
//         onSuccess: () => {
//             toast.success("Class added successfully!");
//             navigate("/teacherDashboard/myClass");
//         },
//         onError: () => {
//             toast.error("Failed to add class. Please try again.");
//         },
//     });

//     const onSubmit = (data) => {
//         const classData = {
//             ...data,
//             price: parseFloat(data.price),
//             status: "pending",
//             teacherInfo: {
//                 name: user.displayName,
//                 email: user.email,
//             },
//         };
//         mutation.mutate(classData); // Call the mutation
//         reset(); // Reset the form after submission
//     };

//     return (
//         <div className="w-[95%] lg:w-[50%] mx-auto">
//             <h1 className="text-2xl font-bold mb-8">Add New Class</h1>
//             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
//                 {/* Title */}
//                 <input
//                     type="text"
//                     {...register("title", { required: true })}
//                     placeholder="Enter class title"
//                     className="p-3 border rounded-md w-full"
//                 />

//                 <div className="flex">
//                     {/* Name (Read-only) */}
//                     <input
//                         type="text"
//                         value={user.displayName}
//                         readOnly
//                         className="p-3 border rounded-md w-full bg-gray-100 cursor-not-allowed"
//                     />

//                     {/* Email (Read-only) */}
//                     <input
//                         type="email"
//                         value={user.email}
//                         readOnly
//                         className="p-3 border rounded-md w-full bg-gray-100 cursor-not-allowed"
//                     />
//                 </div>

//                 {/* Price */}
//                 <input
//                     type="number"
//                     {...register("price", { required: true })}
//                     placeholder="Enter class price"
//                     className="p-3 border rounded-md w-full"
//                 />

//                 {/* Description */}
//                 <textarea
//                     {...register("description", { required: true })}
//                     placeholder="Enter class description"
//                     className="p-3 border rounded-md w-full"
//                     rows="4"
//                 ></textarea>

//                 {/* Image */}
//                 <input
//                     type="text"
//                     {...register("image", { required: true })}
//                     placeholder="Enter image URL"
//                     className="p-3 border rounded-md w-full"
//                 />

//                 {/* Submit Button */}
//                 <button
//                     type="submit"
//                     disabled={mutation.isLoading}
//                     className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                 >
//                     {mutation.isLoading ? "Adding..." : "Add Class"}
//                 </button>
//             </form>
//             <Toaster />
//         </div>
//     );
// };

// export default AddClassPage;
