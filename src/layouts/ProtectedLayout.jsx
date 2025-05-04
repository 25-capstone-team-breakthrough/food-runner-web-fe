import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "../contexts/AuthContext";

const ProtectedLayout = () => {
    const { isLoggedIn } = useAuthState();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default ProtectedLayout;
