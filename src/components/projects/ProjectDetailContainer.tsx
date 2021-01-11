import React from 'react';
import ticketList from '../../fakeAPI/ticketList';
import projectDetail from '../../fakeAPI/projectDetail';

// interfaces
import { Project, Ticket, NewTicketProps } from '../../types';

import ProjectDetailView from './ProjectDetailView';

const ProjectDetailContainer = (props: any): React.ReactElement => {
    const getTickets = (projectSlug: string): Ticket[] => {
        // TODO: this is where the API call will live; will have to take in the projectSlug parameter; it's available at `props.match.params.projectSlug`
        return ticketList;
    };

    const getProject = (projectSlug: string): Project => {
        // TODO: this is where the projectdetail api call lives; will need the projectSlug parameter; it's available at `props.match.params.projectSlug`
        console.log({ projectSlug });
        return projectDetail;
    };

    const createTicket = (newTicket: NewTicketProps): void => {
        // TODO: the API call to create a new ticket will live here
        console.log(newTicket)
    }

    const projectSlug = props.match.params.projectSlug;

    return <ProjectDetailView tickets={getTickets(projectSlug)} project={getProject(projectSlug)} createTicket={createTicket} />;
};

export default ProjectDetailContainer;
