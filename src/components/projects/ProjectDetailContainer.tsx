import React from 'react';
import projectList from '../../fakeAPI/projectList';
import ticketList from '../../fakeAPI/ticketList';
import projectDetail from '../../fakeAPI/projectDetail';

// interfaces
import { Project, Ticket, Comment } from '../../types';

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

    const projectSlug = props.match.params.projectSlug;

    return <ProjectDetailView tickets={getTickets(projectSlug)} project={getProject(projectSlug)} />;
};

export default ProjectDetailContainer;
