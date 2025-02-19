import { NavLink } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const JoinAsTeacher = () => {
    return (
        <section className="bg-gray-100 pb-10 dark:bg-gray-800">

                <SectionTitle
                    title="Become an Instructor"
                    subTitle="Share your expertise and inspire the next generation of learners. Join our community of educators and help shape the future of learning."
                ></SectionTitle>

            <div className="w-[95%] lg:w-[90%] mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center">

                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <img
                        src="images/teacher.png"
                        alt="Inspire as a Teacher"
                        className="w-[80%] max-w-md mx-auto lg:max-w-none lg:mx-0"
                    />
                </div>

                <div className="lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Become an Instructor
                    </h2>
                    <p className="mt-4 text-gray-700 mb-6 dark:text-gray-300">
                        Join a global community of educators and inspire students around
                        the world. Share your knowledge and make an impact today.
                    </p>
                    <NavLink to='/becomeInstructor' className="mt-6 px-6 py-3 bg-[#0048B0] text-white rounded-md shadow-lg hover:bg-[#126ae6] transition">
                        Start Teaching Now
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default JoinAsTeacher;