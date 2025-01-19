import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2';

const UpdateClassPage = () => {
    const classes = useLoaderData();
    const {
        title,
        description,
        price,
        image,
        teacherInfo
    } = classes;

    const handleUpdateClass = e => {
        e.preventDefault();
        const image = e.target.image.value;
        const title = e.target.title.value;
        const description = e.target.description.value;
        const price = e.target.price.value;

        const updatedClass = { title,description, price, image};

        // Send updated data to the server
        fetch(`http://localhost:3000/classes/${classes._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedClass),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success",
                        text: "successfully updated Item  !",
                        icon: "success",
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="w-[95%] lg:w-[80%] mx-auto">
        <h1 className="text-2xl font-bold mb-8">Update Class</h1>
        <form onSubmit={handleUpdateClass}  className="flex flex-col gap-6">
            {/* Title */}
            <input
                type="text"
                name="title"
                defaultValue={title}
                required
                className="p-3 border rounded-md w-full"
            />

            <div className="flex">
                {/* Name (Read-only) */}
                <input
                    type="text"
                    value={teacherInfo.name}
                    readOnly
                    className="p-3 border rounded-md w-full bg-gray-100 cursor-not-allowed"
                />

                {/* Email (Read-only) */}
                <input
                    type="email"
                    value={teacherInfo.email}
                    readOnly
                    className="p-3 border rounded-md w-full bg-gray-100 cursor-not-allowed"
                />
            </div>

            {/* Price */}
            <input
                type="number"
                name="price"
                defaultValue={price}
                required
                className="p-3 border rounded-md w-full"
            />

            {/* Description */}
            <textarea
                name="description"
                defaultValue={description}
                required
                className="p-3 border rounded-md w-full"
                rows="4"
            ></textarea>

            {/* Image */}
            <input
                type="text"
                name="image"
                defaultValue={image}
                required
                className="p-3 border rounded-md w-full"
            />

            {/* Submit Button */}
            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
                Update Class
            </button>
        </form>
    </div>
    );
};

export default UpdateClassPage;