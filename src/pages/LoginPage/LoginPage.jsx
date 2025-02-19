import { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import useTitle from "../../hooks/useTitle";
import axios from "axios";

const LoginPage = () => {
    // for the title
    useTitle("Login");

    const { loginUser, loginWithGoogle } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setError("");
        setLoading(true);

        const { email, password } = data;

        loginUser(email, password)
            .then(() => {
                toast.success("Login successful!");
                navigate(from,{replace: true});
            })
            .catch((err) => {
                toast.error(err.message || "Invalid email or password.");
                setError(err.message || "Invalid email or password.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const googleLogin = async () => {
        setLoading(true);
    
        try {
            // Log in with Google
            const result = await loginWithGoogle();
            const { displayName, photoURL, email } = result.user;
    
            // Save user data to the database
            await axios.post(`https://y-five-lemon.vercel.app/users/${email}`, {
                name: displayName,
                image: photoURL,
                email: email,
            });
    
            toast.success("Logged in with Google!");
            navigate("/");
        } catch (err) {
            toast.error(err.message || "Google login failed. Please try again.");
            console.error("Google login error:", err);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="w-[95%] lg:w-[50%] mx-auto py-24 px-5">
            <h1 className="text-3xl font-semibold text-center mb-5 dark:text-white">Login</h1>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col border p-5">
                <label className="dark:text-white">Email</label>
                <input
                    className="p-3 border mb-5"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <label className="dark:text-white">Password</label>
                <div className="relative">
                    <input
                        className="p-3 border mb-5 w-full"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...register("password", { required: "Password is required" })}
                    />
                    <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-4 bottom-5 flex items-center text-gray-500"
                    >
                        {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <button
                    disabled={loading}
                    className="text-white bg-[#6666F2] px-4 py-2 hover:bg-[#5757d8] transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            {/* Additional Options */}
            <div className="flex flex-col py-3">
                <button
                    onClick={googleLogin}
                    disabled={loading}
                    className="p-3 border mb-3 bg-white  text-black hover:bg-[#6666F2] hover:text-white transition"
                >
                    {loading ? "Logging in..." : "Login with Google"}
                </button>
                <p className="text-center dark:text-white">
                    Do not have an account? <NavLink to="/register" className="text-blue-400">Register Now</NavLink>
                </p>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-3">{error}</p>}

            {/* Toast container */}
            <Toaster />
        </div>
    );
};

export default LoginPage;