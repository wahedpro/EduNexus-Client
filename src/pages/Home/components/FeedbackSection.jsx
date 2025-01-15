import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const FeedbackSection = () => {
    const feedbacks = [
        {
            id: 1,
            text: "The course was very informative, and the instructor was highly knowledgeable.",
            name: "Jane Doe",
            image: "https://i.ibb.co.com/DKnLtVb/wahedpro.jpg",
            title: "Web Development Bootcamp",
            rating: 3
        },
        {
            id: 2,
            text: "I enjoyed the live sessions and hands-on projects. Highly recommend it!",
            name: "John Smith",
            image: "https://i.ibb.co.com/ykLfM5q/7.jpg",
            title: "Digital Marketing Essentials",
            rating: 4
        },
        {
            id: 3,
            text: "The instructor explained complex topics very clearly. Great experience!",
            name: "Alice Brown",
            image: "https://i.ibb.co.com/D1SjC52/11.jpg",
            title: "Data Science Masterclass",
            rating: 5
        },
        {
            id: 4,
            text: "The course structure was excellent, and the assignments were very helpful.",
            name: "Robert Wilson",
            image: "https://i.ibb.co.com/DKnLtVb/wahedpro.jpg",
            title: "Graphic Design for Beginners",
            rating: 4
        }
    ];

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
                                    src={feedback.image}
                                    alt={feedback.name}
                                    className="w-20 h-20 rounded-full mb-4"
                                />
                                <h3 className="text-lg font-semibold">{feedback.name}</h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    <em>{feedback.title}</em>
                                </p>

                                <Rating
                                    style={{ maxWidth: 150 }}
                                    value={feedback.rating}
                                    readOnly
                                />
                                
                                <p className="text-gray-700 text-center">{feedback.text}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FeedbackSection;