import React from 'react';
import toast from 'react-hot-toast';
import projectDetail from '../../fakeAPI/projectDetail';

import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuth } from '../context/AuthContext';
import { closeTicket, getTicketDetails, reopenTicket } from '../API/FirebaseAPI';

import LoadingBar from '../LoadingBar';

// interfaces
import { NewOrUpdatedTicketProps, Project } from '../../types';

import TicketDetailView from './TicketDetailView';

interface ParamTypes {
    teamSlug: string;
    projectSlug: string;
    ticketSlug: string;
}

const TicketDetailContainer = (props: any): React.ReactElement => {
    const { ticketSlug, projectSlug, teamSlug } = useParams<ParamTypes>();
    const history = useHistory();
    // const { data: user } = useQuery('user', async () => await currentUser.getIdToken(), {staleTime: Infinity});
    const { isLoading, error, data } = useQuery<any, Error>(
        ['ticketDetails', { teamSlug, ticketSlug }],
        () => getTicketDetails({ teamSlug, projectSlug, ticketSlug }),
        { staleTime: 30000 },
    );

    const queryClient = useQueryClient();
    const closingMutation = useMutation(closeTicket, {
        onSuccess: () => {
            queryClient.invalidateQueries(['ticketDetails', { teamSlug, ticketSlug }]);
            queryClient.invalidateQueries(['ticketList', { teamSlug, projectSlug }]);
            history.push(`/teams/${teamSlug}/projects/${projectSlug}/`);
            toast.success('Ticket closed!');
        },
    });

    const handleCloseTicket = (ticketSlug: string, resolutionState?: string): void => {
        const data = { is_open: false, resolution: resolutionState ? resolutionState : 'Unspecified.' };
        closingMutation.mutate({ teamSlug, projectSlug, ticketSlug, data });
    };

    const reopeningMutation = useMutation(reopenTicket, {
        onSuccess: () => {
            queryClient.invalidateQueries(['ticketDetails', { teamSlug, ticketSlug }]);
            queryClient.invalidateQueries(['ticketList', { teamSlug, projectSlug }]);
            toast.success('Ticket reopened!');
        },
    });

    const handleReopenTicket = (ticketSlug: string): void => {
        reopeningMutation.mutate({ teamSlug, projectSlug, ticketSlug });
    };

    const updateTicket = (updatedTicket: NewOrUpdatedTicketProps): void => {
        console.log(`Updating ticket ${ticketSlug}`);
        console.log(updatedTicket);
        toast.success('Ticket updated!');
        // TODO: the API call to update the current ticket will live here
        // TODO: will have to figure out how to re-render the TicketDetailContainer when this happens so the updated version of the ticket is fetched
    };

    return (
        <div className="container">
            {isLoading ? <LoadingBar /> : null}
            {error ? error.message : null}
            {data && (
                <TicketDetailView ticket={data.data} handleCloseTicket={handleCloseTicket} handleReopenTicket={handleReopenTicket} updateTicket={updateTicket} />
            )}
        </div>
    );
};

export default TicketDetailContainer;
