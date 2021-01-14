import React from 'react';
import teamDetail from '../../fakeAPI/teamDetail';
import { useParams } from 'react-router-dom'

// interface imports
import { Team, TeamMembership } from '../../types';

// internal imports
import TeamMembersPanel from './TeamMembersPanel';

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
    const getTeam = (teamSlug: string): Team => {
        // TODO: The API call to get a specific team will live here
        console.log(`Getting team ${teamSlug}`);
        return teamDetail;
    };

    const { teamSlug } = useParams<ParamTypes>();

    return <ManageTeam team={getTeam(teamSlug)} />;
};

const ManageTeam: React.FunctionComponent<ManageTeamProps> = ({ team }: ManageTeamProps): React.ReactElement => {
    //TODO: extract team members, sort them, display them

    return (
        <div className="container mt-4">
            <div className="columns">
                <div className="column">
                    <h1 className="title">{team.title}</h1>
                    <p>{team.description}</p>
                    <p>Created on {new Date(team.created).toLocaleDateString()}</p>
                </div>
                <div className="column">
                    <TeamMembersPanel members={team.memberships} />
                </div>
            </div>
        </div>
    );
};

export default ManageTeamController;
