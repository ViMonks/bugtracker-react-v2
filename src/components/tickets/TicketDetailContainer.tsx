import React from 'react';
import toast from 'react-hot-toast';
import projectDetail from '../../fakeAPI/projectDetail';

import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthContext';
import { getTicketDetails } from '../API/FirebaseAPI';

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
    // const { data: user } = useQuery('user', async () => await currentUser.getIdToken(), {staleTime: Infinity});
    const { isLoading, error, data } = useQuery<any, Error>(
        ['ticketDetails', { teamSlug }],
        () => getTicketDetails({ teamSlug, projectSlug, ticketSlug }),
        { staleTime: 30000 },
    );

    const closeTicket = (ticketSlug: string, resolutionState?: string): void => {
        console.log(`Closing ticket ${ticketSlug} with resolution ${resolutionState ? resolutionState : 'unspecified.'}`);
        toast.success('Ticket closed!'); // implementation with Promises: https://react-hot-toast.com/docs/toast
        // TODO: the API call to close the current ticket will be made here
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
                <TicketDetailView
                    ticket={data.data}
                    closeTicket={closeTicket}
                    updateTicket={updateTicket}
                />
            )}
        </div>
    );
};

export default TicketDetailContainer;
