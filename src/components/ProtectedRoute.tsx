import { Navigate } from "react-router-dom";
import type { ReactNode }from "react";
import { useAuth } from "../context/AuthContext";

//component to protect routes that require authentication
interface ProtectedRouteProps {
    children: ReactNode;
}

//check if user is authenticated, if not redirect to login page
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
