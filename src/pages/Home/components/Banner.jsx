import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Banner = () => {
    return (
        <div className="py-2 max-w-full">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="relative"
            >
                <SwiperSlide>
                    <img
                        className="w-full h-96 object-cover  shadow-lg"
                        src="https://i.ibb.co.com/hV7t6m8/1.png"
                        alt="Slide 1"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="w-full h-96 object-cover  shadow-lg"
                        src="https://i.ibb.co.com/QcsxzvH/2.png"
                        alt="Slide 2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="w-full h-96 object-cover  shadow-lg"
                        src="https://i.ibb.co.com/1fcpvJc/3.png"
                        alt="Slide 3"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;