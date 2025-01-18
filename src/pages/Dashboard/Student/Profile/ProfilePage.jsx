import { useContext } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";

const ProfilePage = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="w-[95%] lg:w-[50%] mx-auto my-10 py-10 border px-5 shadow-sm">
            <h1 className="text-2xl font-bold text-center mb-8">User Information</h1>

            <div className="flex flex-col items-center gap-6">
                {/* User Image */}
                <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="w-32 h-32 rounded-full border shadow-md"
                />

                {/* User Details */}
                <div className="w-full text-center">
                    <p className="text-lg font-semibold">
                        <span className="text-gray-600">Name: </span>
                        {user.displayName}
                    </p>
                    <p className="text-lg font-semibold">
                        <span className="text-gray-600">Role: </span>
                        {user.role}
                    </p>
                    <p className="text-lg font-semibold">
                        <span className="text-gray-600">Email: </span>
                        {user.email}
                    </p>
                    
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;