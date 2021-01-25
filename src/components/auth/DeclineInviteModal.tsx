import React from 'react';
import { TeamInvitation } from '../../types';

interface DeclineModalInviteProps {
    invitation: TeamInvitation;
    handleDeclineInvite: (teamSlug: string, invitationId: string) => void;
}

export default function DeclineInviteModal({ invitation, handleDeclineInvite }: DeclineModalInviteProps): React.ReactElement {
    const [isActive, setIsActive] = React.useState(false);

    const handleSubmit = () => {
        handleDeclineInvite(invitation.team, invitation.id)
        setIsActive(false)
    }

    return (
        <>
            <button
                                className="button"
                                data-tooltip="Decline"
                                onClick={() => setIsActive(!isActive)}
                            >
                                <span className="icon is-small">
                                    <i className="fas fa-times"></i>
                                </span>
                            </button>

            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                Are you sure you wish to decline the invitation to {invitation.team_title}?
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="card-footer-item">
                                <button
                                    className="button is-danger is-light"
                                    onClick={handleSubmit}
                                >
                                    Decline Invitation
                                </button>
                            </div>
                            <div className="card-footer-item">
                                <button
                                    className="button"
                                    onClick={() => setIsActive(!isActive)}
                                >
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
