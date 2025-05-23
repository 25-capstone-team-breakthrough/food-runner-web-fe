import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../contexts/AuthContext";

const ProtectedLayout = () => {
    const { isLoggedIn, isInitialized } = useAuthState();

    if (!isInitialized) {
        return null;
    }
    
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedLayout;
