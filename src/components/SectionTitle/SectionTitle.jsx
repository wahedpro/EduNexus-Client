
const SectionTitle = ({title, subTitle}) => {
    return (
        <div className="text-center py-14">
            <h2 className="text-3xl font-bold pb-3 text-[#0048B0] dark:text-white">{title}</h2>
            <p className="w-[90%] lg:w-[40%] mx-auto text-gray-700 dark:text-gray-300">{subTitle}</p>
        </div>
    );
};

export default SectionTitle;