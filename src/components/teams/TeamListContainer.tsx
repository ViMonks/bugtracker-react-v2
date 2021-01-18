import React from 'react';
import teamList from '../../fakeAPI/teamList';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthContext';

// interfaces
import { Team, NewTeamProps } from '../../types';

// internal imports
import TeamListView from './TeamListView';
import CreateTeamModalForm from './CreateTeamModalForm';
import { getTeamsList } from '../API/Api';
import LoadingBar from '../LoadingBar';

const TeamListContainer = (): React.ReactElement => {
    const { currentUser } = useAuth();
    const { data: user } = useQuery('user', async () => await currentUser.getIdToken());
    const { isLoading, error, data } = useQuery<any, Error>(['team', user], () => getTeamsList(user), { enabled: !!user });

    const getTeams = (): Team[] => {
        // TODO: this is where the API call to get a user's teams will live
        return teamList;
    };

    const createTeam = (newTeam: NewTeamProps): void => {
        // TODO: This is where the API call to submit a new team POST request will live
        console.log('New Team');
        console.log(newTeam);
        toast.success('New team created!');
    };

    const [teams, setTeams] = React.useState(getTeams());

    return (
        <div className="container">
            <div className="block">
                {isLoading ? <LoadingBar /> : null}
                {error ? error.message : null}
                {data ? <TeamListView teams={data.data} /> : null}
            </div>
            <div className="block">
                <CreateTeamModalForm createTeam={createTeam} />
            </div>
        </div>
    );
};

export default TeamListContainer;
