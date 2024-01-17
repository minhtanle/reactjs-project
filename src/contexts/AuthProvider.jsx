import { useEffect, useReducer } from "react"
import { AuthContext, inititalState } from "./AuthContext"
import { onAuthStateChanged, getAuth } from "firebase/auth"

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
                isLoading: false,
                user
            }
        },

        SIGN_OUT: (state) => {
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
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
            dispatch({ type: 'INITIAL', isAuthenticated: false, user: null })

            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    dispatch({ type: 'SIGN_IN', isAuthenticated: true, user })
                } else {
                    dispatch({ type: 'SIGN_OUT'})
                }
            });
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
