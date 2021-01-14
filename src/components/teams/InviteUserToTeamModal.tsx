import React from 'react';
import { toast } from 'react-hot-toast'

// internal imports
import { validateEmail } from '../utils';

const InviteUserToTeamModal: React.FunctionComponent = (): React.ReactElement => {
    const [email, setEmail] = React.useState('');
    const [emailIsValid, setEmailIsValid] = React.useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const element = e.target as HTMLInputElement;
        setEmail(element.value);
    };

    const handleSubmit = () => {
        // TODO: API call to invite new team member
        toast.success(`Invitation sent to ${email}.`)
        setEmail('')
    }

    React.useEffect(() => {
        setEmailIsValid(validateEmail(email));
    }, [email]);

    return (
        <div>
            <div className="field is-grouped">
                <div className="control">
                    <input
                        className={email && !emailIsValid ? 'input is-danger' : 'input'}
                        type="email"
                        placeholder="Invite new user by email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>

                <div className="control">
                    {emailIsValid ? (
                        <button className="button is-primary" onClick={handleSubmit}>Invite</button>
                    ) : (
                        <button className="button is-primary" disabled>
                            Invite
                        </button>
                    )}
                </div>
            </div>
            {email && !emailIsValid ? <p className="help is-danger">Please enter a valid email address.</p> : null}
        </div>
    );
};

export default InviteUserToTeamModal;
