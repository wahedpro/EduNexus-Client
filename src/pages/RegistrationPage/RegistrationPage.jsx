import {useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useTitle from "../../hooks/useTitle";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";

const RegisterPage = () => {
    // for the title
    useTitle("RegisterPage");

    const { createUser, userManageProfile} = useContext(AuthContext);

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setError("");

        const { name, email, photoURL, password } = data;

        // Password Validation
        const validationErrors = [];
        if (password.length < 6) {
            validationErrors.push("Password must be at least 6 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
            validationErrors.push("Password must include at least one uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
            validationErrors.push("Password must include at least one lowercase letter.");
        }
        if (validationErrors.length > 0) {
            setError(validationErrors.join(" "));
            return;
        }

        // Register User and Update Profile
        createUser(email, password)
            .then(async res =>  {
                console.log(res.user);
                await axios.post(
                    `http://localhost:3000/users/${email}`,
                    {
                        name: name,
                        image: photoURL,
                        email: email,
                    }
                )
                return userManageProfile(name, photoURL);
            })
            .then(() => {
                toast.success("Successfully registered!");
                navigate("/");
            })
            .catch((err) => {
                toast.error(err.message || "Failed to register. Please try again.");
                setError(err.message || "Failed to register. Please try again.");
            });
    };

    return (
        <div className="w-[95%] lg:w-[50%] shadow-sm mx-auto my-10 py-10 border px-5">
            <h1 className="text-2xl font-semibold text-center mb-5">Registration</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <label>Name</label>
                <input
                    className="p-2 border mb-5"
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <label>Email</label>
                <input
                    className="p-2 border mb-5"
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

                <label>Photo URL</label>
                <input
                    className="p-2 border mb-5"
                    type="text"
                    placeholder="Enter your photo URL"
                    {...register("photoURL", { required: "Photo URL is required" })}
                />
                {errors.photoURL && <p className="text-red-500">{errors.photoURL.message}</p>}

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

                <button className="text-white bg-[#6666F2] px-4 py-2 hover:bg-[#4545bd] transition mb-3">
                    Register
                </button>
            </form>
            {error && <p className="text-red-500 mb-5">{error}</p>}
            <p className="text-center">
                Already have an account?{" "}
                <NavLink to="/login" className="text-blue-400">
                    Login Now
                </NavLink>
            </p>

            {/* Toast Notifications */}
            <Toaster />
        </div>
    );
};

export default RegisterPage;