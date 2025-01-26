import { useContext } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useTitle from "../../../../hooks/useTitle";

const ProfilePage = () => {

    useTitle('Profile Page');

    const { user } = useContext(AuthContext); 

    const axiosSecure = useAxiosSecure();

    const { data: dbUser, isLoading, isError, error } = useQuery({
        queryKey: ['user', user?.email], 
        queryFn: async () => {
            const response = await axiosSecure.get(`/all-user?email=${user.email}`);
            return response.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return <p className="text-center mt-10">Loading user information...</p>;
    }

    if (isError) {
        return <p className="text-center mt-10">Error loading user information: {error?.message}</p>;
    }

    return (
        <div className="w-[95%] lg:w-[50%] mx-auto my-10 py-10 border bg-white px-5 shadow-sm">
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
