/* eslint-disable */
import React from 'react';
import { setTokenSourceMapRange } from 'typescript';
import { auth } from '../../auth/firebase';
import { useQuery } from 'react-query'

const AuthContext = React.createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState('')

    function logout() {
        auth.signOut()
    }

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {            
            setCurrentUser(user);
            setLoading(false)           
            
        });

        return unsubscribe;
    }, []);

    React.useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged((user) => {
            user.getIdToken().then(token => setUser(token))
        });
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        user,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
