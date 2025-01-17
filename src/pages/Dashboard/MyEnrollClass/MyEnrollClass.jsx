import { useNavigate } from "react-router-dom";

const MyEnrollClass = () => {
    const navigate = useNavigate();

    const classes = [
        {
            "id": "1",
            "title": "Web Development Basics",
            "name": "John Doe",
            "image": "https://i.ibb.co.com/FsbgZ2s/course.png"
        },
        {
            "id": "2",
            "title": "Introduction to Digital Marketing",
            "name": "Jane Smith",
            "image": "https://i.ibb.co.com/FsbgZ2s/course.png"
        },
        {
            "id": "3",
            "title": "Graphic Design Fundamentals",
            "name": "Alice Johnson",
            "image": "https://i.ibb.co.com/FsbgZ2s/course.png"
        }
    ];
    
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
                        <p className="text-gray-600 mb-4 text-center">By: {classItem.name}</p>

                        {/* Continue Button */}
                        <button
                            onClick={() => navigate(`/class/${classItem.id}`)} // Navigate to class details page
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Continue
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyEnrollClass;
