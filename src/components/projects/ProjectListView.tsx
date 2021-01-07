import React from 'react';

// Interface imports
import { Project, ProjectMembership } from '../../types';

interface ProjectListViewProps {
    projects: Project[];
}

interface ProjectFilterProps {
    title: string;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    startDate: string;
    handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    endDate: string;
    handleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    manager: string;
    handleManagerChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    viewingArchived: boolean;
    handleViewingArchivedChange: () => void;
    handleFilterReset: () => void;
    uniqueManagers: string[];
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
        <div className="container mx-auto py-4 px-2 w-auto">
            <h1 className="text-5xl text-blue-800 text-left">Projects</h1>
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
            <ProjectTable projects={filteredProjects} />
        </div>
    );
};

const ProjectFilter: React.FunctionComponent<ProjectFilterProps> = ({
    title,
    handleTitleChange,
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    manager,
    handleManagerChange,
    viewingArchived,
    handleViewingArchivedChange,
    handleFilterReset,
    uniqueManagers,
}: ProjectFilterProps): React.ReactElement => {
    return (
        <div className="container shadow bg-gray-200 mt-3">
            <div className="my-2 grid grid-cols-1 md:grid-cols-10">
                <div className="text-left md:text-center md:col-span-2">
                    <label className="text-2xl text-gray-800" htmlFor="title">
                        Title:
                    </label>
                    <input
                        className="mx-1 border rounded-md focus:ring-2 outline-none bg-gray-300 text-gray-700"
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="text-left md:text-center md:col-span-2">
                    <label className="text-2xl text-gray-800" htmlFor="start-date">
                        Start date:
                    </label>
                    <input
                        className="mx-1 border rounded-md focus:ring-2 outline-none bg-gray-300 text-gray-700"
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="text-left md:text-center md:col-span-2">
                    <label className="text-2xl text-gray-800" htmlFor="end-date">
                        End date:
                    </label>
                    <input
                        className="mx-1 border rounded-md focus:ring-2 outline-none bg-gray-300 text-gray-700"
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
                <div className="text-left md:text-center md:col-span-2">
                    <label className="text-2xl text-gray-800" htmlFor="manager">
                        Manager:
                    </label>
                    <select
                        name="manager"
                        id="manager"
                        className="mx-1 border rounded-md focus:ring-2 outline-none bg-gray-300 text-gray-700"
                        value={manager}
                        onChange={handleManagerChange}
                    >
                        <option value=""></option>
                        {uniqueManagers.map((manager, index) => (
                            <option key={index} value={manager}>
                                {manager}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-left md:text-center md:col-span-1">
                    <button
                        className="text-l text-gray-800 bg-gray-300 hover:bg-gray-400 border border-gray-800 px-2 rounded-sm mt-1"
                        onClick={handleFilterReset}
                    >
                        Reset
                    </button>
                </div>
                <div className="text-left md:text-center md:col-span-1">
                    <button
                        className={
                            viewingArchived
                                ? 'text-l text-gray-800 bg-blue-300 hover:bg-blue-400 border border-blue-800 px-2 rounded-sm mt-1'
                                : 'text-l text-gray-800 bg-blue-300 hover:bg-blue-400 border border-blue-800 px-2 rounded-sm mt-1'
                        }
                        onClick={handleViewingArchivedChange}
                    >
                        {viewingArchived ? 'View active' : 'View archived'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProjectTable: React.FunctionComponent<ProjectListViewProps> = ({
    projects,
}: ProjectListViewProps): React.ReactElement => {
    const createHeader = (header: string, index: string): React.ReactElement => {
        return (
            <th key={index.toString()} className="border border-blue-300 px-1 py-2 bg-blue-200 text-blue-900">
                {header}
            </th>
        );
    };

    const createCell = (value: string | number | null): React.ReactElement => {
        return <td className="border border-gray-300 py-2 px-1 bg-gray-100 text-gray-500">{value}</td>;
    };

    const createDateCell = (value: string) => {
        const date = new Date(value)
        return <td className="border border-gray-300 py-2 px-1 bg-gray-100 text-gray-500">{date.toLocaleDateString()}</td>;
    }

    const headers: string[] = ['Title', 'Description', 'Manager', 'Open Tickets', 'Created'];

    return (
        <table className="shadow-lg mt-1 w-full text-left">
            <thead>
                <tr>{headers.map((header: string, index: number) => createHeader(header, index.toString()))}</tr>
            </thead>
            <tbody>
                {projects.map((project) => {
                    return (
                        <tr key={project.slug}>
                            {createCell(project.title)}
                            {createCell(project.description)}
                            {createCell(project.manager)}
                            {createCell(project.open_tickets)}
                            {createDateCell(project.created)}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ProjectListView;
