import React from 'react';

// Interface imports
import { Project, ProjectMembership, Ticket, Comment } from '../../types';

import TicketTable from '../tickets/TicketTable'

interface ProjectDetailViewProps {
    project: Project;
    tickets: Ticket[];
}

interface ProjectDetailPaneProps {
    project: Project;
}

const ProjectDetailView: React.FunctionComponent<ProjectDetailViewProps> = ({
    project,
    tickets,
}: ProjectDetailViewProps): React.ReactElement => {
    return (
        <div className="container mx-auto py-4 px-2 w-auto">
            <div className="grid grid-cols-3">
                <div className="col-span-1 text-left">
                    <ProjectDetailPane project={project} />
                </div>
                <div className="col-span-2 text-left">
                    <TicketTable tickets={tickets} />
                </div>
            </div>
        </div>
    );
};

const ProjectDetailPane: React.FunctionComponent<ProjectDetailPaneProps> = ({
    project,
}: ProjectDetailPaneProps): React.ReactElement => {
    const { title, manager, description, created, memberships, is_archived } = project;

    return (
        <div className="">
            <h1 className="text-2xl">{title}</h1>
            <p>{description}</p>
            <p>
                <strong>Manager: </strong>
                {manager}
            </p>
            <p>
                <strong>Assigned developers: </strong>
            </p>{' '}
            {/* TODO: implement developer iteration */}
            <p>Created: {new Date(created).toLocaleDateString()}</p>
        </div>
    );
};

export default ProjectDetailView;
