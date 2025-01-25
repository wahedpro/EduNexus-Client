import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from 'react';
import { auth } from "../firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const GoogleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle = () => {
        return signInWithPopup(auth, GoogleProvider);
    }

    const userManageProfile = (name, images) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: images
        })
    }

    const userLogout = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const user = { email: currentUser.email };
                axios.post('https://y-five-lemon.vercel.app/jwt', user)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            } else {
                localStorage.removeItem('access-token');
                setUser(null);
            }
            setLoading(false);
            return () => {
                unsubscribe();
            }
        })
    }, [])


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#0048B0]"></div>
            </div>
        );
    }

    const authInfo = {
        user,
        setUser,
        createUser,
        loginUser,
        loginWithGoogle,
        userManageProfile,
        userLogout,
        loading,
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;