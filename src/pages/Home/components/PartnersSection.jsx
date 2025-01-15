import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const PartnersSection = () => {
    const partners = [
        {
            logo: "partners_icons/google.png",
            description: "Driving innovation and access to advanced educational tools."
        },
        {
            logo: "partners_icons/linkedin.png",
            description: "Connecting learners with global opportunities and career networks."
        },
        {
            logo: "partners_icons/visual_studio.png",
            description: "Providing world-class development tools for learners and professionals."
        },
        {
            logo: "partners_icons/github.png",
            description: "Enabling collaboration and version control for seamless learning projects."
        },
        {
            logo: "partners_icons/operating.png",
            description: "Supporting platforms with cutting-edge technological advancements."
        }
    ];
    
    return (
        <section className="bg-gray-100 pb-10">
            <div className="w-[95%] lg:w-[90%] mx-auto">

                <SectionTitle title="Our Partners" subTitle="We proudly collaborate with leading organizations to enhance learning experiences."></SectionTitle>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {partners.map((partner, index) => (
                        <div key={index} className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center justify-center">
                            <img
                                src={partner.logo}
                                alt={`${partner.name} Logo`}
                                className="w-[50px] mb-4"
                            />
                            <p className="text-gray-600 text-center text-sm">{partner.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;