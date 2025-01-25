import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import { AuthContext } from '../provider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#0048B0]"></div>
        </div>;
    }
    // If user is not authenticated, navigate to the login page
    if (!user) {
        return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
    }
    // Render children if user is authenticated
    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;