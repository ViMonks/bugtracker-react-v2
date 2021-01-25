import React from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { leaveTeam } from '../API/FirebaseAPI';

interface ParamTypes {
    teamSlug: string;
}

export default function LeaveTeamModal() {
    const [isActive, setIsActive] = React.useState(false);
    const { teamSlug } = useParams<ParamTypes>();
    const history = useHistory();

    const queryClient = useQueryClient();

    const mutation = useMutation(leaveTeam, {
        onSuccess: () => {
            queryClient.invalidateQueries();
            queryClient.refetchQueries();
            toast.success('You have left the team.');
            setIsActive(false);
            history.push('/teams/');
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const removeMember = () => {
        mutation.mutate({ teamSlug });
    };

    return (
        <>
            <button className="button is-outlined is-danger" onClick={() => setIsActive(!isActive)}>Leave Team</button>

            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">Are you sure you wish to leave this team?</div>
                        </div>
                        <div className="card-footer">
                            <div className="card-footer-item">
                                <button className="button is-danger" onClick={removeMember}>
                                    Leave Team
                                </button>
                            </div>
                            <div className="card-footer-item">
                                <button className="button is-info" onClick={() => setIsActive(!isActive)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={() => setIsActive(!isActive)}
                ></button>
            </div>
        </>
    );
}
