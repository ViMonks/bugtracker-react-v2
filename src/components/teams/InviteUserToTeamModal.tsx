import React from 'react';
import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { inviteToTeam } from '../API/FirebaseAPI';

// internal imports
import { validateEmail } from '../utils';

interface ParamTypes {
    teamSlug: string;
}

const InviteUserToTeamModal: React.FunctionComponent = (): React.ReactElement => {
    const [email, setEmail] = React.useState('');
    const [emailIsValid, setEmailIsValid] = React.useState(false);
    const { teamSlug } = useParams<ParamTypes>();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const element = e.target as HTMLInputElement;
        setEmail(element.value);
    };

    const queryClient = useQueryClient();
    const mutation = useMutation(inviteToTeam, {
        onSuccess: () => {
            queryClient.invalidateQueries('teamDetails');
            queryClient.refetchQueries();
            toast.success('User invited to team.');
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = () => {
        const data = { invitee_email: email }
        mutation.mutate({ teamSlug, data })
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
