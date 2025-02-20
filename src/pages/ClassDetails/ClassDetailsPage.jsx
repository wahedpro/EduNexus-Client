import { NavLink, useLoaderData } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const ClassDetailsPage = () => {

    useTitle('Class Details Page');

    const classes = useLoaderData();

    // Destructure the class details
    const { title, description, price, image, teacherInfo } = classes;

    return (
        <div className="max-w-4xl mx-auto bg-white pt-36 pb-24 dark:bg-gray-900">
            <div className="lg:flex gap-5 border p-3">
                {/* Class Image */}
                <div className="w-full">
                    <img
                        src={image}
                        alt={title}
                        className="h-full object-cover rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    {/* Class Details */}
                    <h1 className="text-3xl font-bold mb-4 dark:text-white">{title}</h1>
                    <p className="text-gray-700 mb-4 dark:text-gray-300">
                        <strong>Description:</strong> {description}
                    </p>
                    <p className="text-gray-700 mb-2 text-lg dark:text-white font-bold">
                        <strong>Price:</strong> ${price}
                    </p>

                    {/* Teacher Information */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="">
                            <h2 className="text-xl font-semibold mb-2 dark:text-gray-200">Teacher Information</h2>
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 font-medium">{teacherInfo.name}</p>
                                <p className="text-gray-500 dark:text-gray-300">{teacherInfo.email}</p>
                            </div>
                        </div>
                        <NavLink to={{
                            pathname: '/payment',
                        }}
                            state={{ classes }} className="px-10 py-2 bg-[#0048B0] hover:bg-blue-400 text-white">Pay</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetailsPage;
