import useTitle from "../../../../hooks/useTitle";


const TeacherDashboard = () => {

    useTitle('Teacher Dashboard');

    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <p className="text-4xl text-center font-semibold">Welcome to the Teacher Dashboard</p>
            </div>
        </div>

    );
};

export default TeacherDashboard;