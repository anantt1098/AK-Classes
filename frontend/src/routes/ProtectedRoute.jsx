import { Navigate, useLocation } from "react-router-dom";

import Loader from "../components/common/Loader";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({
    children,
    allowedRoles = [],
}) {
    const { user, loading } = useAuth();

    const location = useLocation();

    // Wait until authentication check finishes
    if (loading) {
        return <Loader />;
    }

    // User not logged in
    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // Role-based protection
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
    ) {
        // Redirect users to their own dashboard
        if (user.role === "teacher") {
            return (
                <Navigate
                    to="/teacher/dashboard"
                    replace
                />
            );
        }

        return (
            <Navigate
                to="/student/dashboard"
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;