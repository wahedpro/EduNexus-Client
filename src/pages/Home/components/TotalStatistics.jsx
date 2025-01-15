import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const TotalStatistics = () => {
    // Example data (replace these with dynamic data from your backend)
    const stats = {
        totalUsers: 1024,
        totalClasses: 75,
        totalEnrollments: 4580
    };

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
                        <p className="text-3xl font-bold mt-2 text-gray-800">{stats.totalUsers}</p>
                    </div>
                
                    <div className="bg-white border shadow-sm rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-semibold text-[#0048B0]">Total Classes</h3>
                        <p className="text-3xl font-bold mt-2 text-gray-800">{stats.totalClasses}</p>
                    </div>
        
                    <div className="bg-white border shadow-sm rounded-lg p-6 text-center">
                        <h3 className="text-2xl font-semibold text-[#0048B0]">Total Enrollments</h3>
                        <p className="text-3xl font-bold mt-2 text-gray-800">{stats.totalEnrollments}</p>
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
