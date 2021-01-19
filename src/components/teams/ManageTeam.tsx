import React from 'react';
import { useParams } from 'react-router-dom';

// interface imports
import { Team } from '../../types';

// internal imports
import TeamMembersPanel from './TeamMembersPanel';
import InviteUserToTeamModal from './InviteUserToTeamModal';
import { useTeam } from '../context/TeamContextDEPRECATED';

// interface ManageTeamControllerProps {
//     teamSlug: string;
// }

interface ManageTeamProps {
    team: Team;
}

interface ParamTypes {
    teamSlug: string;
}

const ManageTeamController: React.FunctionComponent = (): React.ReactElement => {
    const { team } = useTeam();

    return <ManageTeam team={team} />;
};

const ManageTeam: React.FunctionComponent<ManageTeamProps> = ({ team }: ManageTeamProps): React.ReactElement => {
    return (
        <div className="container mt-4">
            <div className="columns">
                <div className="column">
                    <h1 className="title">{team.title}</h1>
                    <p>{team.description}</p>
                    <p>Created on {new Date(team.created).toLocaleDateString()}</p>
                    <div className="mt-2">
                        <InviteUserToTeamModal /> {/* TODO: this should only appear for admins */}
                    </div>
                </div>
                <div className="column">
                    <TeamMembersPanel members={team.memberships} />
                </div>
            </div>
        </div>
    );
};

export default ManageTeamController;
