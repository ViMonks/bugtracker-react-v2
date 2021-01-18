import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

// interfaces
import { NewTeamProps } from '../../types';

// internal imports
import TeamListView from './TeamListView';
import CreateTeamModalForm from './CreateTeamModalForm';
import { useAuth } from '../context/AuthContext';
import { getTeamsList } from '../API/Api';
import LoadingBar from '../LoadingBar';

const TeamListContainer = (): React.ReactElement => {
    const { currentUser, user } = useAuth();
    // const { data: user } = useQuery('user', async () => await currentUser.getIdToken(), {staleTime: Infinity});
    const { isLoading, error, data } = useQuery<any, Error>(['team', user], () => getTeamsList(user), {
        enabled: !!user, staleTime: 30000
    });

    const createTeam = (newTeam: NewTeamProps): void => {
        // TODO: This is where the API call to submit a new team POST request will live
        console.log('New Team');
        console.log(newTeam);
        toast.success('New team created!');
    };

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
