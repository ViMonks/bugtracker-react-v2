import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// interface imports
import { TeamMembership } from '../../types';
import { useMutation, useQueryClient } from 'react-query';
import { removeTeamMember } from '../API/FirebaseAPI';

interface TeamMembersPanelProps {
    members: TeamMembership[];
}

interface TeamPanelBlockProps {
    member: TeamMembership;
}

interface ParamTypes {
    teamSlug: string;
}

const TeamPanelBlock: React.FunctionComponent<TeamPanelBlockProps> = ({
    member,
}: TeamPanelBlockProps): React.ReactElement => {
    const { teamSlug } = useParams<ParamTypes>();
    const [isActive, setIsActive] = React.useState(false);
    const username = member.user;

    const queryClient = useQueryClient();

    const removeMemberMutation = useMutation(removeTeamMember, {
        onSuccess: () => {
            queryClient.invalidateQueries('teamDetails');
            queryClient.refetchQueries();
            toast.success('User removed from team.');
            setIsActive(false);
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const removeMember = () => {
        const member = { member: username };
        removeMemberMutation.mutate({ teamSlug, member });
    };

    const toggleIsActive = () => {
        setIsActive(!isActive);
    };

    return (
        <Fragment key={member.user}>
            <a className="panel-block" onClick={toggleIsActive}>
                <span className="panel-icon">
                    <i className="fas fa-user"></i>
                </span>
                {member.user}
            </a>

            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">Are you sure you wish to remove {member.user} from your team?</div>
                        </div>
                        <div className="card-footer">
                            <div className="card-footer-item">
                                <button className="button is-danger" onClick={removeMember}>
                                    Remove Member
                                </button>
                            </div>
                            <div className="card-footer-item">
                                <button className="button is-info" onClick={toggleIsActive}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={toggleIsActive}></button>
            </div>
        </Fragment>
    );
};

const TeamMembersPanel: React.FunctionComponent<TeamMembersPanelProps> = ({
    members,
}: TeamMembersPanelProps): React.ReactElement => {
    return (
        <nav className="panel is-link">
            <p className="panel-heading">Remove Members</p>
            {members.filter((member) => member.role_name !== 'Administrator').map((member) => <TeamPanelBlock key={member.user} member={member} />)}
        </nav>
    );
};

export default TeamMembersPanel;
