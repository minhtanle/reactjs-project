import { useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";
import Loading from "@/components/Loading";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const [redirectPath, setRedirectPath] = useState(null);

    useEffect(() => {
        if (!isAuthenticated && !redirectPath) {
            // Store the current path for redirection after authentication
            setRedirectPath(window.location.pathname);
        }
    }, [isAuthenticated, redirectPath]);

    if (isLoading) return <Loading />;

    if (!isAuthenticated && redirectPath) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default AuthGuard;