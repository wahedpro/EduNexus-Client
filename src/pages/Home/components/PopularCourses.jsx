import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { NavLink } from "react-router-dom";

const PopularCourses = () => {

    const axiosSecure = useAxiosSecure();
    
    const fetchClasses = async () => {
        const { data } = await axiosSecure.get("/topClasses");
        return data;
    };

    const { data: classes = []} = useQuery({
        queryKey: ["allClasses"],
        queryFn: fetchClasses,
    });

    return (
        <section className="w-[95%] lg:w-[90%] mx-auto pb-16">
            <div className="container mx-auto text-center">
                <SectionTitle 
                    title="Popular Courses" 
                    subTitle="Explore the top-enrolled courses and boost your skills today!">
                </SectionTitle>

                <Swiper
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {classes.map((course) => (
                        <SwiperSlide key={course.id}>
                            <div className="bg-white border shadow-md p-3 rounded-lg">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full object-cover rounded mb-2"
                                />
                                <div className="text-left">
                                    <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                                    <p className="text-gray-600 mb-1">{course.teacherInfo.name}</p>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.description}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl font-bold text-[#0048B0]">$ {course.price}</p>
                                    <NavLink to={`/classDetailsPage/${course._id}`} className="bg-[#0048B0] px-10 py-2 text-white hover:bg-[#0c5dcee5]">Enroll</NavLink>
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
