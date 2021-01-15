import React from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom'

export default function Signup() {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const confirmPasswordRef = React.useRef();
    const { signup, currentUser } = useAuth();
    const history = useHistory()

    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function handleSubmit() {
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            toast.error('Passwords do not match.');
            return setError('Passwords do not match.');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push('/teams')
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }

        setLoading(false);
    }

    return (
        <div className="container mt-4">
            <div className="columns">
                <div className="column is-4 is-offset-4">
                <h1 className="title">Sign Up</h1>
                    <div className="field">
                        <label className="label">Email</label>
                        <p className="control has-icons-left">
                            <input className="input" type="email" ref={emailRef} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <p className="control has-icons-left">
                            <input className="input" type="password" ref={passwordRef} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <label className="label">Confirm password</label>
                        <p className="control has-icons-left">
                            <input className="input" type="password" ref={confirmPasswordRef} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            {loading ? (
                                <button className="button is-link" onClick={handleSubmit} disabled>
                                    Sign Up
                                </button>
                            ) : (
                                <button className="button is-link" onClick={handleSubmit}>
                                    Sign Up
                                </button>
                            )}
                        </p>
                    </div>
                    <div className="">
                        <p>Already have an account? <Link to={`/login`}>Log in.</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
