import { NavLink, useLoaderData } from "react-router-dom";

const ClassDetailsPage = () => {
    const classes = useLoaderData();

    // Destructure the class details
    const { title, description, price, image, teacherInfo } = classes;

    return (
        <div className="max-w-4xl mx-auto bg-white my-10">
            <div className="flex gap-5">
                {/* Class Image */}
                <div className="w-full mb-6">
                    <img
                        src={image}
                        alt={title}
                        className="h-full object-cover rounded-md"
                    />
                </div>

                <div>
                    {/* Class Details */}
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-gray-700">
                        <strong>Description:</strong> {description}
                    </p>
                    <p className="text-gray-700 mt-2">
                        <strong>Price:</strong> ${price}
                    </p>

                    {/* Teacher Information */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="">
                            <h2 className="text-xl font-semibold mb-2">Teacher Information</h2>
                            <div>
                                <p className="text-gray-700 font-medium">{teacherInfo.name}</p>
                                <p className="text-gray-500">{teacherInfo.email}</p>
                            </div>
                        </div>
                        <NavLink to={{
                            pathname: '/payment',
                        }}
                            state={{ classes }} className="px-5 py-2 bg-blue-500">Pay</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetailsPage;
