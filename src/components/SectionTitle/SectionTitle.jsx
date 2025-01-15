
const SectionTitle = ({title, subTitle}) => {
    return (
        <div className="text-center py-14">
            <h2 className="text-3xl font-bold pb-3">{title}</h2>
            <p className="w-[40%] mx-auto">{subTitle}</p>
        </div>
    );
};

export default SectionTitle;