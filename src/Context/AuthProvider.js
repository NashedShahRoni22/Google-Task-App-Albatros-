import React, { createContext, useState } from 'react';
import { app } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    const googleSignIn =()=>{
        setLoader(true);
        return signInWithPopup(auth, googleProvider);
    }
    const createUser =(email,password)=>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser =(email, password)=>{
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signOutUser=()=>{
        localStorage.removeItem('accessToken');
        return signOut(auth);
    }

    const authInfo ={
        googleSignIn, 
        createUser, 
        loader, 
        setLoader, 
        loginUser,
        signOutUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;