import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import useTitle from "../../hooks/useTitle";

const LoginPage = () => {
    // for the title
    useTitle("Login");

    const { loginUser, loginWithGoogle } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
                navigate("/");
            })
            .catch((err) => {
                toast.error(err.message || "Invalid email or password.");
                setError(err.message || "Invalid email or password.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const googleLogin = () => {
        setLoading(true);
        loginWithGoogle()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate("/");
            })
            .catch((err) => {
                toast.error(err.message || "Google login failed. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="w-[95%] lg:w-[50%] mx-auto my-10 py-10 border px-5">
            <h1 className="text-2xl font-semibold text-center mb-5">Login</h1>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <label>Email</label>
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

                <label>Password</label>
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
                <p className="text-center">
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