import useTitle from "../../../../hooks/useTitle";

const StudentDashboard = () => {

    useTitle('Student Dashboard');

    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <p className="text-4xl text-center font-semibold">Welcome to the Student Dashboard</p>
            </div>
        </div>
    );
};

export default StudentDashboard;