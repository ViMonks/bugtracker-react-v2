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
        <div className="container">
            <div className="columns">
                <div className="column is-one-third">
                    <ProjectDetailPane project={project} />
                </div>
                <div className="column">
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
            <button className="text-l text-gray-800 bg-gray-300 hover:bg-gray-400 border border-gray-800 px-2 rounded-sm mt-1 mx-2 focus:outline-none">
                {is_archived ? 'Reopen project' : 'Archive project'}
            </button>
        </div>
    );
};

export default ProjectDetailView;
// TODO: add submit ticket view
// TODO: add manage developers view
// TODO: add update project view
// TODO: add archive project button
// TODO: add subscribe to project button
