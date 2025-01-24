import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const FeedbackSection = () => {
    
    const axiosSecure = useAxiosSecure();
    
    const fetchClasses = async () => {
        const { data } = await axiosSecure.get("/feedback");
        return data;
    };

    const { data: feedbacks = []} = useQuery({
        queryKey: ["feedbacks"],
        queryFn: fetchClasses,
    });


    return (
        <section className="bg-gray-100 pb-10">
            <div className="w-[95%] lg:w-[90%] mx-auto">
                <SectionTitle
                    title="Teachers Feedback"
                    subTitle="See what students are saying about their learning experiences!"
                ></SectionTitle>

                <Swiper
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    navigation={true} // Enable navigation (arrows)
                    modules={[Navigation, Autoplay]}
                    slidesPerView={1}
                    autoplay={{ delay: 5000 }}
                    
                >
                    {feedbacks.map((feedback) => (
                        <SwiperSlide key={feedback.id}>
                            <div className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center">
                                <img
                                    src={feedback.photo}
                                    alt={feedback.name}
                                    className="w-20 h-20 rounded-full "
                                />
                                <h3 className="text-lg font-semibold">{feedback.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    <em>{feedback.title}</em>
                                </p>

                                <Rating
                                    style={{ maxWidth: 150 }}
                                    value={feedback.rating}
                                    readOnly
                                />
                                
                                <p className="text-gray-700 text-center w-[70%]">{feedback.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeedbackSection;