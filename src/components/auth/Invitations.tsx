import React from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TeamInvitation } from '../../types';
import { getMyInvitations, acceptTeamInvite, declineTeamInvite } from '../API/FirebaseAPI';
import LoadingBar from '../LoadingBar';
import { getLastUpdatedString } from '../utils';

export default function Invitations(): React.ReactElement {
    const [declineModalIsActive, setDeclineModalIsActive] = React.useState(false);

    const { isLoading, error, data } = useQuery<any, Error>(['invitations'], () => getMyInvitations(), {
        staleTime: 30000,
    });

    const queryClient = useQueryClient();
    const acceptInvitationMutation = useMutation(acceptTeamInvite, {
        onSuccess: () => {
            queryClient.invalidateQueries('invitations');
            queryClient.invalidateQueries('teamList');
            toast.success('Team invitation accepted!');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
    const handleAcceptInvite = (teamSlug: string, invitationId: string) => {
        acceptInvitationMutation.mutate({ teamSlug, invitationId });
    };

    const declineInvitationMutation = useMutation(declineTeamInvite, {
        onSuccess: () => {
            queryClient.invalidateQueries('invitations');
            toast.success('Team invitation declined.');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });
    const handleDeclineInvite = (teamSlug: string, invitationId: string) => {
        declineInvitationMutation.mutate({ teamSlug, invitationId });
    };

    const createInvitationElement = (invitation: TeamInvitation): React.ReactElement => {
        return (
            <>
                <nav className="level ml-4">
                    <div className="level-left">
                        <div className="level-item">
                            <div>
                                <h1 className="title is-5">{invitation.team_title}</h1>
                                <h2 className="subtitle is-6 mt-1">
                                    Invited {getLastUpdatedString(invitation.created)}
                                </h2>
                            </div>
                        </div>
                        <div className="level-item">
                            <button
                                className="button"
                                data-tooltip="Accept"
                                onClick={() => handleAcceptInvite(invitation.team, invitation.id)}
                            >
                                <span className="icon is-small">
                                    <i className="fas fa-check"></i>
                                </span>
                            </button>
                        </div>
                        <div className="level-item">
                            <button className="button" data-tooltip="Decline" onClick={() => setDeclineModalIsActive(!declineModalIsActive)}>
                                <span className="icon is-small">
                                    <i className="fas fa-times"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Decline Invite Modal */}
                <div className={declineModalIsActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">Are you sure you wish to decline the invitation to {invitation.team_title}?</div>
                        </div>
                        <div className="card-footer">
                            <div className="card-footer-item">
                                <button className="button is-danger is-light" onClick={() => handleDeclineInvite(invitation.team, invitation.id)}>
                                    Decline Invitation
                                </button>
                            </div>
                            <div className="card-footer-item">
                                <button className="button" onClick={() => setDeclineModalIsActive(!declineModalIsActive)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={() => setDeclineModalIsActive(!declineModalIsActive)}
                ></button>
            </div>
            </>
        );
    };

    return (
        <div className="container">
            <h1 className="title">Team Invitations</h1>
            {isLoading && <LoadingBar />}
            {error && <p>{error.message}</p>}

            {data &&
                data.data.map((invitation: TeamInvitation): React.ReactElement => createInvitationElement(invitation))}
        </div>
    );
}
