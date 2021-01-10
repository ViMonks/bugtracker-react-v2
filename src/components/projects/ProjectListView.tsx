import React from 'react';
import { Link } from 'react-router-dom';

// Interface imports
import { Project, ProjectMembership } from '../../types';

// internal imports
import ProjectTable from './ProjectTable';
import ProjectFilter from './ProjectFilter';

interface ProjectListViewProps {
    projects: Project[];
}

// TODO: implement new project button
const ProjectListView: React.FunctionComponent<ProjectListViewProps> = ({
    projects,
}: ProjectListViewProps): React.ReactElement => {
    // state hooks for ProjectFilter component
    const [filteredProjects, setFilteredProjects] = React.useState(projects);
    const [title, setTitle] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [manager, setManager] = React.useState('');
    const [viewingArchived, setViewingArchived] = React.useState(false);

    // Creates an array of all unique managers of all projects, to be passed to ProjectFilter's manager select element
    const getUniqueManagers = (projects: Project[]): string[] => {
        // get an array of all members
        let allMembers: ProjectMembership[] = [];
        projects.map((project) => {
            allMembers = [...allMembers, ...project.memberships];
        });

        // filter array to only managers
        const allManagers: ProjectMembership[] = allMembers.filter((membership) => membership.role_name === 'Manager');

        // extract usernames from array of ProjectMembership objects
        const usernames: string[] = allManagers.map((membership) => membership.user);

        // get unique usernames
        const uniqueUsernames: string[] = [...new Set(usernames)];

        return uniqueUsernames;
    };

    // Filters project array based on values from ProjectFilter element
    const filterProjects = (projects: Project[]): Project[] => {
        const filteredProjects: Project[] = [];
        projects.forEach((project) => {
            const titleMatches = project.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
            const managerMatches =
                manager === '' ? true : project.manager && project.manager.toLowerCase() === manager.toLowerCase();
            const startDateMatches = new Date(project.created) >= new Date(startDate) || startDate === '';
            const endDateMatches = new Date(project.created) <= new Date(endDate) || endDate === '';
            const viewingArchivedMatches = project.is_archived === viewingArchived;
            const allFiltersMatch =
                titleMatches && managerMatches && startDateMatches && endDateMatches && viewingArchivedMatches;
            if (allFiltersMatch) {
                filteredProjects.push(project);
            }
        });
        return filteredProjects;
    };

    // calls filterProjects when state changes based on input values from ProjectFilter, then sets the newly filtered projects to state
    React.useEffect(() => {
        setFilteredProjects(filterProjects(projects));
    }, [title, startDate, endDate, manager, viewingArchived]);

    // Callback functions passed down to ProjectFilter to handle input changes
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const element = e.target as HTMLInputElement;
        setTitle(element.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const element = e.target as HTMLInputElement;
        setStartDate(element.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const element = e.target as HTMLInputElement;
        setEndDate(element.value);
    };

    const handleManagerChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const element = e.target as HTMLSelectElement;
        setManager(element.value);
    };

    const handleViewingArchivedChange = (): void => {
        setViewingArchived(!viewingArchived);
    };

    const handleFilterReset = (): void => {
        setTitle('');
        setManager('');
        setStartDate('');
        setEndDate('');
    };

    return (
        <div className="container">
            <div className="block">
                <h1 className="title is-1 has-text-grey-dark">
                    {viewingArchived ? 'Archived Projects' : 'Projects'}
                </h1>
            </div>

            <div className="block">
                <ProjectFilter
                    title={title}
                    handleTitleChange={handleTitleChange}
                    startDate={startDate}
                    handleStartDateChange={handleStartDateChange}
                    endDate={endDate}
                    handleEndDateChange={handleEndDateChange}
                    manager={manager}
                    handleManagerChange={handleManagerChange}
                    viewingArchived={viewingArchived}
                    handleViewingArchivedChange={handleViewingArchivedChange}
                    handleFilterReset={handleFilterReset}
                    uniqueManagers={getUniqueManagers(projects)}
                />
            </div>
            <div className="block">
                <ProjectTable projects={filteredProjects} />
            </div>
        </div>
    );
};

export default ProjectListView;
