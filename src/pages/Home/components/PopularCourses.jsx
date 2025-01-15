import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const PopularCourses = () => {
    const courses = [
        {
            id: 1,
            title: "Web Development Bootcamp on 30 day",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            name: "Wahidul Islam",
            price: 1200,
            description: "Learn full-stack development with hands-on projects."
        },
        {
            id: 2,
            title: "Digital Marketing Essentials with live ",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            name: "Wahidul Islam",
            price: 950,
            description: "Master SEO, social media, and online advertising."
        },
        {
            id: 3,
            title: "Data Science Masterclass with practices",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            name: "Wahidul Islam",
            price: 800,
            description: "Dive deep into data analysis and machine learning."
        },
        {
            id: 4,
            title: "Graphic Design for Beginners in 30 day",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            name: "Wahidul Islam",
            price: 650,
            description: "Explore design principles and tools like Photoshop."
        },
        {
            id: 5,
            title: "Cybersecurity Fundamentals with Social media",
            image: "https://i.ibb.co.com/FsbgZ2s/course.png",
            name: "Wahidul Islam",
            price: 500,
            description: "Protect systems with practical cybersecurity skills."
        }
    ];

    return (
        <section className="w-[95%] lg:w-[90%] mx-auto pb-16">
            <div className="container mx-auto text-center">
                <SectionTitle title="Popular Courses" subTitle="Explore the top-enrolled courses and boost your skills today!"></SectionTitle>

                <Swiper
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {courses.map((course) => (
                        <SwiperSlide key={course.id}>
                            <div className="bg-white border shadow-md p-3 rounded-lg">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                                <div className="text-left">
                                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                                    <p className="text-gray-600 mb-1">{course.name}</p>
                                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                                    
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl font-bold text-[#0048B0]">$ {course.price}</p>
                                    <button className="bg-[#0048B0] px-10 py-2 text-white hover:bg-[#0c5dcee5]">Enroll</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default PopularCourses;
