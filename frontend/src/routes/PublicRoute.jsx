import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useAuth } from "../hooks/useAuth";

function PublicRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Wait until authentication check finishes
    if (loading) {
        return <Loader />;
    }

    // If user is already logged in, redirect them to their dashboard
    if (user) {
        const redirectPath =
            user.role === "teacher"
                ? "/teacher/dashboard"
                : "/student/dashboard";

        const from = location.state?.from?.pathname;
        const targetPath =
            from && from !== "/login" && from !== "/register"
                ? from
                : redirectPath;

        return <Navigate to={targetPath} replace />;
    }

    return children;
}

export default PublicRoute;
