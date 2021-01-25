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
import { Link } from 'react-router-dom';

const TeamListContainer = (): React.ReactElement => {
    const { isLoading, error, data } = useQuery<any, Error>(['team'], () => getTeamsList(), {
        staleTime: 30000,
    });

    // background prefetching project list happens in the TeamCard component

    const queryClient = useQueryClient();
    const mutation = useMutation(createTeam, {
        onSuccess: () => {
            queryClient.invalidateQueries('team');
            toast.success('New team created!');
        },
        onError: () => {
            toast.error('Something went wrong. Please try again.');
        },
    });
    const handleCreateTeam = (newTeam: NewTeamProps) => {
        mutation.mutate({ newTeam });
    };

    return (
        <div className="container">
            <div className="block">
                {isLoading ? <LoadingBar /> : null}
                {error ? error.message : null}
                {data ? <TeamListView teams={data.data} /> : null}
                {data && data.data.length === 0 && (
                    <div className="container mt-4">
                        <h1 className="title is-5">
                            You are not yet a member of any teams. You may either create a new team or see if you have
                            any pending <Link to="/dashboard/invitations">team invitations</Link>.
                        </h1>
                    </div>
                )}
            </div>
            <div className="block">
                <CreateTeamModalForm createTeam={handleCreateTeam} />
            </div>
        </div>
    );
};

export default TeamListContainer;
