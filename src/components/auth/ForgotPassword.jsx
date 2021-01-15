import React from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = React.useRef();
    const { resetPassword } = useAuth();

    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    async function handleSubmit() {
        try {
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            toast.success('Check your email for instructions on resetting your password.')
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
                <h1 className="title">Password Reset</h1>
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
                        <p className="control">
                            {loading ? (
                                <button className="button is-link" onClick={handleSubmit} disabled>
                                    Reset Password
                                </button>
                            ) : (
                                <button className="button is-link" onClick={handleSubmit}>
                                    Reset Password
                                </button>
                            )}
                        </p>
                    </div>                    
                    <div className="">
                        <p><Link to={`/login`}>Return to login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
