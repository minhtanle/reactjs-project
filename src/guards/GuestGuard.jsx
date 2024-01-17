import useAuth from "../hooks/useAuth"
import Loading from "@/components/Loading"
import { Navigate } from "react-router-dom";

const GuestGuard = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) return <Loading />;

    if (isAuthenticated) return <Navigate to="/" replace />;

    return (<>{children}</>)
}

export default GuestGuard