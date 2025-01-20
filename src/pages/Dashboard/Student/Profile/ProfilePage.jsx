import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import axios from "axios";

const ProfilePage = () => {
    const { user } = useContext(AuthContext); // User from context
    const [dbUser, setDbUser] = useState(null); // State to store user details from DB
    const [loading, setLoading] = useState(true);

    // Fetch user details from the database by email
    useEffect(() => {
        const fetchUserByEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/all-user?email=${user.email}`);
                setDbUser(response.data); // Store DB user details
            } catch (error) {
                console.error("Error fetching user:", error.response?.data?.message || error.message);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        if (user?.email) {
            fetchUserByEmail();
        }
    }, [user?.email]);

    if (loading) {
        return <p className="text-center mt-10">Loading user information...</p>;
    }

    return (
        <div className="w-[95%] lg:w-[50%] mx-auto my-10 py-10 border px-5 shadow-sm">
            <h1 className="text-2xl font-bold text-center mb-8">User Information</h1>

            <div className="flex flex-col items-center gap-6">
                {/* User Image */}
                <img
                    src={dbUser?.image || user.photoURL}
                    alt="User Profile"
                    className="w-32 h-32 rounded-full border shadow-md"
                />

                {/* User Details */}
                <div className="w-full text-center">
                    <p className="text-lg font-semibold">
                        <span className="text-gray-600">Name: </span>
                        {dbUser?.name || user.displayName}
                    </p>
                    <p className="text-lg font-semibold">
                        <span className="text-gray-600">Role: </span>
                        {dbUser?.role || "N/A"}
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
