import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/configs/firebase';

export const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => userCredential.user)
        .then(async user => {
            // Store session
            const idToken = await user.getIdToken();
            setToken(idToken)

            return user;
        })
        .catch(error => {
            throw error
        })
}

const setToken = (idToken) => {
    sessionStorage.setItem('auth-token', idToken)
}

