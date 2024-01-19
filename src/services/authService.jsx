import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '@/configs/firebase';

export const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => userCredential.user)
        .then(user => {
            return user;
        })
        .catch(error => {
            throw error
        })
}

export const logout = async () => {
    signOut(auth).then(() => {
        return true;
    }).catch(error => {
        throw error
    })
}

export const register = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(() => true)
        .catch((error) => {
            throw error
        });
}

export const getCurrentUser = async () => {
    const auth = await getAuth();
    return auth.currentUser;
};