import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Categories = () => {
    const categories = [
        { name: "Web Development", icon: "🌐" },
        { name: "Data Science", icon: "📊" },
        { name: "Programming", icon: "💻" },
        { name: "Graphic Design", icon: "🎨" },
        { name: "Marketing", icon: "📈" },
        { name: "Photography", icon: "📸" },
    ];

    return (
        <section className="bg-white pb-12 dark:bg-gray-900">
            <div className="w-[95%] lg:w-[90%] mx-auto text-center">

                <SectionTitle
                    title="Explore Categories"
                    subTitle="Discover a variety of categories to learn and grow your skills."
                ></SectionTitle>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 p-6 border rounded-lg hover:shadow-lg"
                        >
                            <div className="text-4xl mb-4">{category.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {category.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;