import { useEffect, useReducer } from "react"
import { AuthContext, inititalState } from "./AuthContext"
import { getCurrentUser } from "../services/authService"

const AuthProvider = ({ children }) => {
    const reducerHandler = {
        INITIAL: (state, data) => {
            const { isAuthenticated, user } = data

            return {
                ...state,
                isAuthenticated,
                isLoading: true,
                user
            }
        },

        SIGN_IN: (state, data) => {
            const { user } = data

            return {
                ...state,
                isAuthenticated: true,
                // isLoading: true,
                user
            }
        },

        SIGN_OUT: (state) => {
            return {
                ...state,
                isAuthenticated: false,
                // isLoading: true,
                user: null
            }
        },

    }

    const reducer = (state, action) => {
        if (!reducerHandler[action.type]) return state;

        return reducerHandler[action.type](state, action)
    }

    const [state, dispatch] = useReducer(reducer, inititalState)

    useEffect(() => {
        (async () => {
            const user = await getCurrentUser()
            if (user) {
                dispatch({ type: 'SIGN_IN', isAuthenticated: true, user })
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
