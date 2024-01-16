import { createContext } from "react";

export const inititalState = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}

export const AuthContext = createContext(inititalState)
