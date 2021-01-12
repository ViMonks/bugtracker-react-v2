import React from 'react';
import teamDetail from '../../fakeAPI/teamDetail';

// interface imports
import { Team, TeamMembership } from '../../types';

interface ManageTeamControllerProps {
    teamSlug: string;
}

interface ManageTeamProps {
    team: Team;
}

const ManageTeamController: React.FunctionComponent<ManageTeamControllerProps> = ({
    teamSlug,
}: ManageTeamControllerProps): React.ReactElement => {
    const getTeam = (teamSlug: string): Team => {
        // TODO: The API call to get a specific team will live here
        console.log(`Getting team ${teamSlug}`);
        return teamDetail;
    };

    return <ManageTeam team={getTeam(teamSlug)} />;
};

const ManageTeam: React.FunctionComponent<ManageTeamProps> = ({ team }: ManageTeamProps): React.ReactElement => {
    //TODO: extract team members, sort them, display them
};

export default ManageTeam;
