import React from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom'

export default function Login() {
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const { login } = useAuth();
    const history = useHistory()

    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function handleSubmit() {
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
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
                    <h1 className="title">Log In</h1>
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
                        <p className="control">
                            {loading ? (
                                <button className="button is-link" onClick={handleSubmit} disabled>
                                    Login
                                </button>
                            ) : (
                                <button className="button is-link" onClick={handleSubmit}>
                                    Login
                                </button>
                            )}
                        </p>
                    </div>
                    <div className="field">
                        <p><Link to="/forgot-password">Forgot password?</Link></p>
                    </div>
                    <div className="">
                        <p>Not yet registered? <Link to={`/signup`}>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
