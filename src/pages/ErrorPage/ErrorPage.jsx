import { NavLink } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { motion } from "motion/react"

const ErrorPage = () => {

    useTitle('Error Page');

    return (
        <div className="flex flex-col items-center justify-center py-40 gap-5">
            <motion.h1
            className="text-7xl font-bold text-[#0048B0]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 100 }}
        >
            404
        </motion.h1>
            <h1 className="text-7xl lg:text-5xl font-bold mb-4 dark:text-white">Page Not Found</h1>
            <NavLink to="/" className="text-[#0048B0] hover:underline text-lg border px-5 py-2"> Back To Home Page </NavLink>
        </div>
    );
};

export default ErrorPage;