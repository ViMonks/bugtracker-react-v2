import React from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';

// Interface imports
import { NewOrUpdatedTicketProps, Project, Ticket } from '../../types';
import { archiveProject, getTeamDetails, unarchiveProject } from '../API/FirebaseAPI';

// internal imports
import CreateTicketModalForm from '../tickets/CreateTicketModalForm';
import TicketTableContainer from '../tickets/TicketTableContainer';
import AssignedDevelopersList from './AssignedDevelopersList';
import ManageProjectMembers from './ManageProjectMembers';
import UpdateProjectModalForm from './UpdateProjectModalForm';

interface ProjectDetailViewProps {
    project: Project;
    tickets: Ticket[];
    createTicket: (newTicket: NewOrUpdatedTicketProps) => void;
}

interface ProjectDetailPaneProps {
    project: Project;
}

interface ParamTypes {
    teamSlug: string;
    projectSlug: string;
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
                        <TicketTableContainer openTickets={project.open_tickets} tickets={[...tickets]} />
                    </div>
                    <div className="block">
                        {project.user_permissions.create_tickets && (
                            <CreateTicketModalForm
                                createTicket={createTicket}
                                canAssignDeveloper={project.user_permissions.assign_developer}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectDetailPane: React.FunctionComponent<ProjectDetailPaneProps> = ({
    project,
}: ProjectDetailPaneProps): React.ReactElement => {
    const { title, manager, description, created, memberships, is_archived, user_permissions } = project;
    const history = useHistory();

    const { teamSlug, projectSlug } = useParams<ParamTypes>();
    const { isLoading, error, data: team } = useQuery<any, Error>(
        ['teamDetails', { teamSlug }],
        () => getTeamDetails({ teamSlug }),
        { staleTime: 30000 },
    );

    // archiving and unarchiving projects
    const queryClient = useQueryClient();
    const archiveProjectMutation = useMutation(archiveProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('projectList');
            queryClient.invalidateQueries('projectDetails');
            queryClient.refetchQueries();
            toast.success('Project archived!');
            history.push(`/teams/${teamSlug}/projects/`);
        },
        onError: () => {
            toast.error('Something went wrong. Please try again.');
        },
    });
    const handleArchiveProject = (): void => {
        const data = { is_archived: true, title: project.title };
        archiveProjectMutation.mutate({ teamSlug, projectSlug, data });
    };

    const unarchiveProjectMutation = useMutation(unarchiveProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('projectList');
            queryClient.invalidateQueries('projectDetails');
            queryClient.refetchQueries();
            toast.success('Project reopened!');
        },
        onError: () => {
            toast.error('Something went wrong. Please try again.');
        },
    });
    const handleUnarchiveProject = (): void => {
        const data = { is_archived: false, title: project.title };
        unarchiveProjectMutation.mutate({ teamSlug, projectSlug, data });
    };

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
                    {manager ? manager : 'None assigned'}
                </p>

                <p className="text-gray-700 pt-1">Created: {new Date(created).toLocaleDateString()}</p>
            </div>
            <div className="block">
                <AssignedDevelopersList memberships={memberships} />
            </div>

            {/* This block loads conditional on the current user having permission to edit the project. */}
            {user_permissions.edit && (
                <div>
                    <div className="block">
                        <nav className="level"></nav>
                        <div className="level-left">
                            <div className="level-item">
                                {is_archived ? (
                                    <button className="button is-light" onClick={() => handleUnarchiveProject()}>
                                        Reopen project
                                    </button>
                                ) : (
                                    <button className="button is-light" onClick={() => handleArchiveProject()}>
                                        Archive project
                                    </button>
                                )}
                            </div>
                            <div className="level-item">
                                <UpdateProjectModalForm project={project} />
                            </div>
                        </div>
                    </div>
                    <div className="block">
                        {error && error.message}
                        {isLoading ? (
                            <button className="button is-white is-loading">Manage project members</button>
                        ) : (
                            <ManageProjectMembers team={team.data} project={project} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetailView;
