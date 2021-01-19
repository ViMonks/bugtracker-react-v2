import React from 'react';
import toast from 'react-hot-toast';
import ticketList from '../../fakeAPI/ticketList';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthContext';
import { getProjectDetails, getTicketList } from '../API/Api';

// interfaces
import { Project, Ticket, NewOrUpdatedTicketProps, Team } from '../../types';

import ProjectDetailView from './ProjectDetailView';
import TeamContext, { useTeam } from '../context/TeamContextDEPRECATED';
import LoadingBar from '../LoadingBar';

interface ParamTypes {
    teamSlug: string;
    projectSlug: string;
}

const ProjectDetailContainer = (props: any): React.ReactElement => {
    const { teamSlug, projectSlug } = useParams<ParamTypes>();
    const { currentUser, user } = useAuth();
    // const { data: user } = useQuery('user', async () => await currentUser.getIdToken(), {staleTime: Infinity});

    const { isLoading: projectIsLoading, error: projectError, data: projectDetails } = useQuery<any, Error>(
        ['projectDetails', { user, teamSlug, projectSlug }],
        () => getProjectDetails({ user, teamSlug, projectSlug }),
        { enabled: !!user, staleTime: 30000 },
    );
    const { isLoading: ticketsIsLoading, error: ticketsError, data: tickets } = useQuery<any, Error>(
        ['ticketList', { user, teamSlug, projectSlug }],
        () => getTicketList({ user, teamSlug, projectSlug }),
        { enabled: !!user },
    );

    const createTicket = (newTicket: NewOrUpdatedTicketProps): void => {
        // TODO: the API call to create a new ticket will live here
        // TODO: use react-router history.push and useHistory() hook to navigate to the ticket detail page after ticket creation
        console.log(newTicket);
        toast.success('Ticket created successfully!'); // TODO: can map a Promise to a toast to have the toast update based on the Promise, like when fetching data. See implementation in docs: https://react-hot-toast.com/docs/toast
    };

    return (
        <div className="container">
            {projectIsLoading || ticketsIsLoading ? <LoadingBar /> : null}
            {projectError ? `Error getting project details: ${projectError.message}` : null}
            {ticketsError ? `Error getting tickets: ${ticketsError.message}` : null}
            {(projectDetails && tickets) && <ProjectDetailView
                tickets={tickets.data}
                project={projectDetails.data}
                createTicket={createTicket}
            />}
        </div>
    );
};

export default ProjectDetailContainer;
