import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";

const MyEnrollClass = () => {
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchClasses = async () => {
            const response = await axios.get(`http://localhost:3000/enroll-class?email=${user.email}`);
            setClasses(response.data);
            setLoading(false);
        };
        fetchClasses();
    }, []);

    if (loading) {
        return <p>Loading classes...</p>;
    }

    return (
        <div className="w-[95%] lg:w-[80%] mx-auto my-10">
            <h1 className="text-3xl font-bold text-center mb-8">Enrolled Classes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                    <div
                        key={classItem.id}
                        className="bg-white border shadow-md rounded-lg p-4 flex flex-col items-center"
                    >
                        {/* Class Image */}
                        <img
                            src={classItem.image}
                            alt={classItem.title}
                            className="w-40 h-40 object-cover rounded-md mb-4"
                        />

                        {/* Class Title */}
                        <h2 className="text-lg font-semibold mb-2 text-center">{classItem.title}</h2>

                        {/* Class Creator */}
                        <p className="text-gray-600 mb-4 text-center">By: {classItem.teacherInfo.name}</p>

                        {/* Continue Button */}
                        <Link
                            to={`/dashboard/MyEnrollClass/${classItem._id}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Continue
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEnrollClass;
