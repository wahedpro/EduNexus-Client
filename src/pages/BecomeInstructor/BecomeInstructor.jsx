import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";

const TeacherApplicationPage = () => {
    const { user } = useContext(AuthContext);
    // const [status, setStatus] = useState(null); // "pending", "approved", "rejected"
    // const [loading, setLoading] = useState(false);

    // // Fetch the current application status
    // useEffect(() => {
    //     const fetchStatus = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:3000/requests/${user.email}`);
    //             setStatus(response.data.status); // "pending", "approved", "rejected"
    //         } catch (error) {
    //             console.error("Error fetching status:", error);
    //         }
    //     };
    //     if (user?.email) fetchStatus();
    // }, [user]);

    const submitTeacherRequest = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // setLoading(true); // Start loading state
    
        const form = e.target;
        const name = user.displayName;
        const image = user.photoURL;
        const email = user.email;
        const title = form.title.value;
        const experience = form.experience.value;
        const category = form.category.value;
        const status = 'pending';
    
        // Create teacher data object
        const teacherData = {
            name,
            image,
            email,
            title,
            experience,
            category,
            status,
        };
    
        console.log(teacherData); // Debugging the data object
    
        try {
            // Add the class to the database
            await axios.post("http://localhost:3000/requests", teacherData);
            // toast.success("Class added successfully!");
            // navigate("/teacherDashboard/myClass"); // Redirect to My Classes Page
        } catch (error) {
            console.error("Error adding class:", error);
            // toast.error("Failed to add class. Please try again.");
        } finally {
            console.error("Error adding class:");
            // setLoading(false);
        }
    };
    

    return (
        <div className="w-[60%] mx-auto py-24">
            <form onSubmit={submitTeacherRequest}>
                {/* images */}
                <div className="flex flex-col items-center">
                    <img
                        src={user?.photoURL}
                        alt="User Profile"
                        className="w-24 h-24 rounded-full border mb-2"
                    />
                </div>
                {/* Name and Email */}
                <div className="flex flex-col items-center gap-2 w-full">
                    <input
                        type="text"
                        name="name"
                        defaultValue={user.displayName}
                        className="p-2 border rounded-md w-full text-center bg-gray-100"
                    />

                    <input
                        type="email"
                        name="email"
                        defaultValue={user?.email}
                        readOnly
                        className="p-2 border rounded-md w-full text-center bg-gray-100 cursor-not-allowed"
                    />
                </div>
                {/* Title */}
                <div className="w-full">
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter a title"
                        className="p-2 border rounded-md w-full"
                    />
                </div>
                <div>
                    <select name="experience">
                        <option value="beginner">Beginner</option>
                        <option value="mid-level">Mid-Level</option>
                        <option value="experienced">Experienced</option>
                    </select>
                </div>
                <div>
                    <select name="category">
                        <option value="web development">Web Development</option>
                        <option value="digital marketing">Digital Marketing</option>
                        <option value="graphic design">Graphic Design</option>
                        <option value="data science">Data Science</option>
                        <option value="cybersecurity">Cybersecurity</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                >
                    Submit for Review
                </button>
            </form>
        </div>
    );

};

export default TeacherApplicationPage;