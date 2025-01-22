// // import { useContext } from "react";
// // import { AuthContext } from "../provider/AuthProvider";
// // import { useQuery } from "@tanstack/react-query";
// // import axios from "axios";

// // const useRole = () => {
// //     const {user} = useContext(AuthContext);
// //     const {data:role, isLoading} = useQuery({
// //         queryKey:['role', user?.email],
// //         queryFn:async()=>{
// //             const {data} = await axios.get(`http://localhost:3000/users/role/${user.email}`);
// //             return data.role;
// //         }
// //     })
// //     return [role,isLoading];
// // };

// // export default useRole;

// import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// const useRole = () => {
//     const { user } = useContext(AuthContext);

//     const { data: role, isLoading, error } = useQuery({
//         queryKey: ['role', user?.email],
//         queryFn: async () => {
//             if (!user?.email) return null; // Prevent unnecessary API calls
//             const { data } = await axios.get(`http://localhost:3000/users/role/${user?.email}`);
//             return data.role;
//         },
//         enabled: !!user?.email, // Ensure the query runs only when email exists
//     });

//     return [role, isLoading, error]; // Include error for debugging if needed
// };

// export default useRole;

import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
    const { user } = useContext(AuthContext);

    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            if (!user?.email) return null;
            const response = await axios.get(`http://localhost:3000/users/role/${user.email}`);
            return response.data.role;
        },
        enabled: !!user?.email, // Run query only when email is available
    });

    return [role, isLoading];
};

export default useRole;
