import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TotalStatistics = () => {

    const axiosSecure = useAxiosSecure();

    // total user
    const fetchTotalUsers = async () => {
        const { data } = await axiosSecure.get("/totalUsers");
        return data.totalUsers;
    };

    const { data: totalUsers} = useQuery({
        queryKey: ["totalUsers"],
        queryFn: fetchTotalUsers,
    });

    // total course
    const fetchTotalCourses = async () => {
        const { data } = await axiosSecure.get("/totalCourses");
        return data.totalCourses;
    };
    
    const { data: totalCourses} = useQuery(
        {
            queryKey: ["totalCourses"],
            queryFn: fetchTotalCourses,
        }
    );

    // total enrollment
    const fetchTotalEnrollments = async () => {
        const { data } = await axiosSecure.get("/totalEnrollments");
        return data.totalEnrollments;
    };

    const { data: totalEnrollments} = useQuery({
        queryKey: ["totalEnrollments"],
        queryFn: fetchTotalEnrollments,
    }
    );
    
    return (
        <section className="w-[95%] lg:w-[90%] mx-auto pb-10">
            <SectionTitle
                    title="Our Impact in Numbers"
                    subTitle="Discover the growing community of learners, educators, and classes shaping the future of education on our platform."
                ></SectionTitle>
            
            <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
            
                <div className="flex flex-col gap-6 w-full lg:w-1/2">
                
                    <div className="bg-white border shadow-sm rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-semibold text-[#0048B0]">Total Users</h3>
                        <p className="text-3xl font-bold mt-2 text-gray-800">{totalUsers}</p>
                    </div>
                
                    <div className="bg-white border shadow-sm rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-semibold text-[#0048B0]">Total Classes</h3>
                        <p className="text-3xl font-bold mt-2 text-gray-800">{totalCourses}</p>
                    </div>
        
                    <div className="bg-white border shadow-sm rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-semibold text-[#0048B0]">Total Enrollments</h3>
                        <p className="text-3xl font-bold mt-2 text-gray-800">{totalEnrollments}</p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <img
                        src="images/online-learning.png"
                        alt="Statistics Illustration"
                    />
                </div>
            </div>
        </section>
    );
};

export default TotalStatistics;
