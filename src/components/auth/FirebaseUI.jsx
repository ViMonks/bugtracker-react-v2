import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig, auth } from '../../auth/firebase';

const FirebaseUI = () => {
    return (
        <div className="container mt-4">
            <div className="columns">
                <div className="column is-4 is-offset-4 has-text-centered">
                    <h1 className="title">Sign in or register</h1>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                </div>
            </div>
        </div>
    );
};

export default FirebaseUI;
