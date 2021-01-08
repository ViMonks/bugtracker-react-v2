import React from 'react';

// Interface imports
import { Project, Ticket } from '../../types';

import TicketTableContainer from '../tickets/TicketTableContainer';
import AssignedDevelopersList from './AssignedDevelopersList';

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
                    <TicketTableContainer tickets={tickets} />
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
            <h1 className="text-5xl text-blue-800 text-left">{title}</h1>
            <p className="leading-relaxed pt-4 text-gray-700">{description}</p>
            <p className="pt-1 text-gray-700">
                <strong>Manager: </strong>
                {manager}
            </p>
            <p className="text-gray-700 pt-1">Created: {new Date(created).toLocaleDateString()}</p>
            <AssignedDevelopersList memberships={memberships} />
        </div>
    );
};

export default ProjectDetailView;
