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
        <div className="container">
            <div className="block">
                <h1 className="title is-1 has-text-dark-grey">{title}</h1>
            </div>
            <div className="block">
                <p className="subtitle has-text-dark-grey">{description}</p>
            </div>
            <div className="block">
                <p className="pt-1 text-gray-700">
                    <strong>Manager: </strong>
                    {manager}
                </p>

                <p className="text-gray-700 pt-1">Created: {new Date(created).toLocaleDateString()}</p>
            </div>
            <div className="block">
                <AssignedDevelopersList memberships={memberships} />
            </div>
            <div className="block">
                <button className="button is-warning is-dark">
                    {is_archived ? 'Reopen project' : 'Archive project'}
                </button>
            </div>
        </div>
    );
};

export default ProjectDetailView;
// TODO: add submit ticket view
// TODO: add manage developers view
// TODO: add update project view
// TODO: add archive project button
// TODO: add subscribe to project button
