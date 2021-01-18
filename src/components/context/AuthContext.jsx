/* eslint-disable */
import React from 'react';
import { setTokenSourceMapRange } from 'typescript';
import { auth } from '../../auth/firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [token, setToken] = React.useState('')

    // function signup(email, password) {
    //     return auth.createUserWithEmailAndPassword(email, password);
    // }

    // function login(email, password) {
    //     return auth.signInWithEmailAndPassword(email, password)
    // }

    function logout() {
        auth.signOut()
    }

    // function resetPassword(email) {
    //     return auth.sendPasswordResetEmail(email)
    // }

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {            
            setCurrentUser(user);
            setLoading(false)
            currentUser.getIdToken().then(token => setToken(token))
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        token,
        // login,
        // signup,
        logout,
        // resetPassword
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
