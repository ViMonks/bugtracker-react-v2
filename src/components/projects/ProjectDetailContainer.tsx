import React from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../context/AuthContext';
import { getProjectDetails, getTicketList, createTicket } from '../API/FirebaseAPI';

// interfaces
import { Project, Ticket, NewOrUpdatedTicketProps, Team } from '../../types';

import ProjectDetailView from './ProjectDetailView';
import LoadingBar from '../LoadingBar';

interface ParamTypes {
    teamSlug: string;
    projectSlug: string;
}

const ProjectDetailContainer = (props: any): React.ReactElement => {
    const { teamSlug, projectSlug } = useParams<ParamTypes>();
    const { currentUser } = useAuth();

    const { isLoading: projectIsLoading, error: projectError, data: projectDetails } = useQuery<any, Error>(
        ['projectDetails', { teamSlug, projectSlug }],
        () => getProjectDetails({ teamSlug, projectSlug }),
        { staleTime: 30000 },
    );
    const { isLoading: ticketsIsLoading, error: ticketsError, data: tickets } = useQuery<any, Error>(
        ['ticketList', { teamSlug, projectSlug }],
        () => getTicketList({ teamSlug, projectSlug }),
        { staleTime: 30000 },
    );

    const queryClient = useQueryClient();
    const mutation = useMutation(createTicket, {
        onSuccess: () => {
            queryClient.invalidateQueries(['ticketList', { teamSlug, projectSlug }]);
            queryClient.invalidateQueries('projectDetails');
            queryClient.refetchQueries();
            toast.success('New ticket created!');
        },
        onError: () => {
            toast.error('Something went wrong. Please try again.');
        },
    });
    const handleSubmit = (newTicket: NewOrUpdatedTicketProps): void => {
        mutation.mutate({ teamSlug, projectSlug, newTicket });
    };

    return (
        <div className="container">
            {projectIsLoading || ticketsIsLoading ? <LoadingBar /> : null}
            {projectError ? `Error getting project details: ${projectError.message}` : null}
            {ticketsError ? `Error getting tickets: ${ticketsError.message}` : null}
            {projectDetails && tickets && (
                <ProjectDetailView tickets={[...tickets.data]} project={projectDetails.data} createTicket={handleSubmit} />
            )}
        </div>
    );
};

export default ProjectDetailContainer;
