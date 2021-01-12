import React from 'react';
import teamList from '../../fakeAPI/teamList';
import toast from 'react-hot-toast'

// interfaces
import { Team, NewTeamProps } from '../../types';

// internal imports
import TeamListView from './TeamListView'
import CreateTeamModalForm from './CreateTeamModalForm'

const TeamListContainer = (): React.ReactElement => {
    const getTeams = (): Team[] => {
        // TODO: this is where the API call to get a user's teams will live
        return teamList;
    };

    const createTeam = (newTeam: NewTeamProps): void => {
        // TODO: This is where the API call to submit a new team POST request will live
        console.log('New Team')
        console.log(newTeam)
        toast.success('New team created!')
    }

    const [teams, setTeams] = React.useState(getTeams());

    return (
        <div className="container">
            <div className="block">
            <TeamListView teams={teams} /></div>
            <div className="block">
            <CreateTeamModalForm createTeam={createTeam} /></div>
        </div>
    );
};

export default TeamListContainer;
