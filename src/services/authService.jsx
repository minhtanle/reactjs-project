import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '@/configs/firebase';

export const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => userCredential.user)
        .then(async user => {
            return user;
        })
        .catch(error => {
            throw error
        })
}

export const logout = async () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        return true;
    }).catch(error => {
        throw error
    })
}

export const getCurrentUser = async () => {
    const auth = await getAuth();
    return auth.currentUser;
};