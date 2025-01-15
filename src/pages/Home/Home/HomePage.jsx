import Banner from "../components/Banner";
import Categories from "../components/Categories";
import FAQ from "../components/FAQ";
import FeedbackSection from "../components/FeedbackSection";
import JoinAsTeacher from "../components/JoinAsTeacher";
import PartnersSection from "../components/PartnersSection";
import PopularCourses from "../components/PopularCourses";
import TotalStatistics from "../components/TotalStatistics";

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <PartnersSection></PartnersSection>
            <PopularCourses></PopularCourses>
            <FeedbackSection></FeedbackSection>
            <TotalStatistics></TotalStatistics>
            <JoinAsTeacher></JoinAsTeacher>
            <Categories></Categories>
            <FAQ></FAQ>
        </div>
    );
};

export default HomePage;