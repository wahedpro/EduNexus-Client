import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const AllClass = () => {
    const classData = [
        {
            title: "Web Development",
            teacherName: "John Doe",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            price: 199.99,
            shortDescription: "Learn how to build responsive websites from scratch.",
            totalEnrolment: 150,
            status: "approved",
        },
        {
            title: "Data Science for Beginners",
            teacherName: "Jane Smith",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            price: 249.99,
            shortDescription: "Master data analysis and visualization techniques.",
            totalEnrolment: 200,
            status: "pending",
        },
        {
            title: "Graphic Design Basics",
            teacherName: "Emily Brown",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            price: 99.99,
            shortDescription: "Create stunning designs using industry tools.",
            totalEnrolment: 120,
            status: "approved",
        },
        {
            title: "Graphic Design Basics",
            teacherName: "Emily Brown",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            price: 99.99,
            shortDescription: "Create stunning designs using industry tools.",
            totalEnrolment: 120,
            status: "approved",
        },
        {
            title: "Graphic Design Basics",
            teacherName: "Emily Brown",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            price: 99.99,
            shortDescription: "Create stunning designs using industry tools.",
            totalEnrolment: 120,
            status: "approved",
        },
        {
            title: "Graphic Design Basics",
            teacherName: "Emily Brown",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            price: 99.99,
            shortDescription: "Create stunning designs using industry tools.",
            totalEnrolment: 120,
            status: "approved",
        },
        {
            title: "Graphic Design Basics",
            teacherName: "Emily Brown",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            price: 99.99,
            shortDescription: "Create stunning designs using industry tools.",
            totalEnrolment: 120,
            status: "approved",
        },
    ];
    return (
        <section className="bg-gray-50">
            <div className="w-[95%] lg:w-[90%] mx-auto">
                <SectionTitle
                    title="All Classes"
                    subTitle=" Browse through all approved classes and enroll in the one that suits you best!"
                ></SectionTitle>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {classData.map((classItem, index) => (
                        <div
                            key={index}
                            className="bg-white border shadow-md overflow-hidden"
                        >
                            {/* Class Image */}
                            <img
                                src={classItem.image}
                                alt={classItem.title}
                                className="w-full h-48 object-cover"
                            />
                            {/* Class Details */}
                            <div className="p-3">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {classItem.title}
                                </h3>

                                <p className=" text-sm text-gray-600">
                                    By: {classItem.teacherName}
                                </p>

                                <p className=" text-gray-700">
                                    {classItem.shortDescription}
                                </p>

                                <div className=" text-sm text-gray-500">
                                    Enrollments: <span className="font-semibold">{classItem.totalEnrolment}</span>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-[#0048B0]">${classItem.price}</h3>
                                    <button className="bg-[#0048B0] px-10 py-2 text-white hover:bg-[#0c5dcee5]">Enroll</button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllClass;