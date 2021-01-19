import React from 'react';

// Interface imports
import { NewOrUpdatedTicketProps, Project, Ticket } from '../../types';

// internal imports
import CreateTicketModalForm from '../tickets/CreateTicketModalForm';
import TicketTableContainer from '../tickets/TicketTableContainer';
import AssignedDevelopersList from './AssignedDevelopersList';
import UpdateProjectModalForm from './UpdateProjectModalForm';

interface ProjectDetailViewProps {
    project: Project;
    tickets: Ticket[];
    createTicket: (newTicket: NewOrUpdatedTicketProps) => void;
}

interface ProjectDetailPaneProps {
    project: Project;
}

const ProjectDetailView: React.FunctionComponent<ProjectDetailViewProps> = ({
    project,
    tickets,
    createTicket,
}: ProjectDetailViewProps): React.ReactElement => {
    return (
        <div className="container">
            <div className="columns">
                <div className="column is-one-third">
                    <ProjectDetailPane project={project} />
                </div>
                <div className="column">
                    <div className="block">
                        <TicketTableContainer tickets={tickets} />
                    </div>
                    <div className="block">
                        <CreateTicketModalForm projectMembers={project.memberships} createTicket={createTicket} />
                    </div>
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
                <nav className="level"></nav>
                <div className="level-left">
                    <div className="level-item">
                        <button className="button is-warning is-dark">
                            {is_archived ? 'Reopen project' : 'Archive project'}
                        </button>
                    </div>
                    <div className="level-item">
                        <UpdateProjectModalForm project={project} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailView;
// TODO: add submit ticket view
// TODO: add manage developers view
// TODO: add archive project button
