import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle login logic (e.g., API call)
    };

    const handleGoogleSignIn = () => {
        console.log("Google Sign-In triggered");
        // Handle Google authentication logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Google Sign-In */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">or</p>
                    <button
                        onClick={handleGoogleSignIn}
                        className="mt-3 w-full flex items-center justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    >
                        <img
                            src="https://img.icons8.com/color/20/000000/google-logo.png"
                            alt="Google Logo"
                            className="mr-2"
                        />
                        Sign in with Google
                    </button>
                </div>

                {/* Redirect to Registration */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Dont have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;