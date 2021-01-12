import React from 'react';
import teamList from '../../fakeAPI/teamList';

// interfaces
import { Team } from '../../types';

// internal imports


const TeamListContainer = (): React.ReactElement => {
    const getTeams = (): Team[] => {
        // TODO: this is where the API call to get a user's teams will live
        return teamList;
    };

    const [teams, setTeams] = React.useState(getTeams());

    return (
        <div>
            <TeamListView teams={teams} />
        </div>
    );
};

export default TeamListContainer;
