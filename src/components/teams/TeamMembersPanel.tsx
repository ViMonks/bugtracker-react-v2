import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast'

// interface imports
import { TeamMembership } from '../../types';

interface TeamMembersPanelProps {
    members: TeamMembership[];
}

interface ParamTypes {
    teamSlug: string;
}

const TeamMembersPanel: React.FunctionComponent<TeamMembersPanelProps> = ({
    members,
}: TeamMembersPanelProps): React.ReactElement => {
    const createPanelBlock = (member: TeamMembership): React.ReactElement => {
        const { teamSlug } = useParams<ParamTypes>();
        const [isActive, setIsActive] = React.useState(false);

        const removeMember = () => {
            // TODO: API call to remove team member; function has access to username and team slug
            console.log(`team slug: ${teamSlug}, member: ${member.user}`);
            setIsActive(false)
            toast.success(`${member.user} removed from team.`)
        };

        const toggleIsActive = () => {
            setIsActive(!isActive);
        };

        return (
            <Fragment>
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
                                <div className="content">
                                    Are you sure you wish to remove {member.user} from your team?
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="card-footer-item">
                                    <button className="button is-danger" onClick={removeMember}>Remove Member</button>
                                </div>
                                <div className="card-footer-item">
                                    <button className="button is-info" onClick={toggleIsActive}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={toggleIsActive}></button>
                </div>
            </Fragment>
        );
    };

    return (
        <nav className="panel is-link">
            <p className="panel-heading">Remove Members</p>
            {members.filter(member => member.role_name !== 'Administrator').map((member) => createPanelBlock(member))}
        </nav>
    );
};

export default TeamMembersPanel;
