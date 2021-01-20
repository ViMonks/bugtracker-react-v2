import React from 'react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from 'react-query';

// interfaces
import { NewTeamProps } from '../../types';

// internal imports
import TeamListView from './TeamListView';
import CreateTeamModalForm from './CreateTeamModalForm';
import { useAuth } from '../context/AuthContext';
import { getTeamsList, createTeam } from '../API/FirebaseAPI';
import LoadingBar from '../LoadingBar';

const TeamListContainer = (): React.ReactElement => {
    const { user } = useAuth();
    const { isLoading, error, data } = useQuery<any, Error>(['team', user], () => getTeamsList(user), {
        enabled: !!user,
        staleTime: 30000,
    });

    // background prefetching project list happens in the TeamCard component

    const queryClient = useQueryClient()
    const mutation = useMutation(createTeam, {
        onSuccess: () => {
            queryClient.invalidateQueries('team')
            toast.success('New team created!')
        },
        onError: () => {
            toast.error('Something went wrong. Please try again.')
        }
    });
    const handleCreateTeam = (newTeam: NewTeamProps) => {
        mutation.mutate({ user, newTeam });
    };

    return (
        <div className="container">
            <div className="block">
                {isLoading ? <LoadingBar /> : null}
                {error ? error.message : null}
                {data ? <TeamListView teams={data.data} /> : null}
            </div>
            <div className="block">
                <CreateTeamModalForm createTeam={handleCreateTeam} />
            </div>
        </div>
    );
};

export default TeamListContainer;
