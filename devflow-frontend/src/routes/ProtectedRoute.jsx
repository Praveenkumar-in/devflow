import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

    const { user, loading } = useAuth();

    if (loading) {

        return (
            <div
                className="vh-100 d-flex justify-content-center align-items-center text-white"
            >
                Loading...
            </div>
        );

    }

    if (!user) {

        return <Navigate to="/" replace />;

    }

    return children;

};

export default ProtectedRoute;