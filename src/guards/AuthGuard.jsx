import useAuth from "../hooks/useAuth"
import Loading from "@/components/Loading"
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return <Loading />;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return (<>{children}</>)
}

export default AuthGuard