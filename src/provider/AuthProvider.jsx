import {createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, updateProfile} from "firebase/auth";
import { createContext, useEffect, useState} from 'react';
import { auth } from "../firebase/firebase.init";

export const AuthContext= createContext();

const AuthProvider = ({children}) => {

    const GoogleProvider = new GoogleAuthProvider();

    const [user, setUser]=useState();
    const [loading, setLoading]= useState(true);

    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const loginWithGoogle=()=>{
        return signInWithPopup(auth, GoogleProvider);
    }

    const userManageProfile=(name,images)=>{
        return updateProfile(auth.currentUser,{
            displayName:name, photoURL:images
        })
    }

    const userLogout = ()=>{
        signOut(auth);
    }

    const authInfo={
        user,
        setUser,
        createUser,
        loginUser,
        loginWithGoogle,
        userManageProfile,
        userLogout,
        loading,
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log(currentUser);
            if(currentUser){
                setUser(currentUser);
            }else{
                setUser(null);
            }
            setLoading(false);
            return ()=>{
                unsubscribe();
            }
        })
    },[])

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;