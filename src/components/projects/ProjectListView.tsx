// import { Hmac } from 'crypto';
import React from 'react';

// Interface imports
import { Project } from '../../types';

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
}

const ProjectListView: React.FunctionComponent<ProjectListViewProps> = ({
    projects,
}: ProjectListViewProps): React.ReactElement => {
    // state hooks for ProjectFilter component
    const [filteredProjects, setFilteredProjects] = React.useState(projects);
    const [title, setTitle] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [manager, setManager] = React.useState('');
    const [viewingArchived, setViewingArchived] = React.useState(false); // TODO: implement this
    // TODO: implement a reset button
    // TODO: implement array of managers to pass down to filter prop

    // Filters project array based on values from ProjectFilter element
    const filterProjects = (projects: Project[]): Project[] => {
        const filteredProjects: Project[] = [];
        projects.forEach((project) => {
            const titleMatches = project.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
            const managerMatches =
                manager === '' ? true : project.manager && project.manager.toLowerCase() === manager.toLowerCase();
            const startDateMatches = new Date(project.created) >= new Date(startDate) || startDate === '';
            const endDateMatches = new Date(project.created) <= new Date(endDate) || endDate === '';
            const allFiltersMatch = titleMatches && managerMatches && startDateMatches && endDateMatches;
            if (allFiltersMatch) {
                filteredProjects.push(project);
            }
        });
        return filteredProjects;
    };

    // calls filterProjects when state changes based on input values from ProjectFilter, then sets the newly filtered projects to state
    React.useEffect(() => {
        setFilteredProjects(filterProjects(projects));
    }, [title, startDate, endDate, manager]);

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
}: ProjectFilterProps): React.ReactElement => {
    return (
        <div className="container shadow bg-gray-200 mt-3">
            <div className="flex md:flex-row flex-col my-2">
                <div className="flex-auto text-left md:text-center">
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
                <div className="flex-auto text-left md:text-center">
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
                <div className="flex-auto text-left md:text-center">
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
                <div className="flex-auto text-left md:text-center">
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
                        <option value="monks">Monks</option>
                        <option value="manager-2">Manager 2</option>
                        <option value="manager-3">Manager 3</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

const ProjectTable: React.FunctionComponent<ProjectListViewProps> = ({
    projects,
}: ProjectListViewProps): React.ReactElement => {
    const createHeader = (header: string): React.ReactElement => {
        return <th className="border border-gray-300 px-1 py-2 bg-gray-200 text-gray-800">{header}</th>;
    };

    const createCell = (value: string | number | null): React.ReactElement => {
        return <td className="border border-gray-300 py-2 px-1 bg-gray-100 text-gray-500">{value}</td>;
    };

    const headers: string[] = ['Title', 'Description', 'Manager', 'Open Tickets', 'Created'];

    return (
        <table className="shadow-lg mt-1 w-full text-left">
            <thead>
                <tr>{headers.map((header: string) => createHeader(header))}</tr>
            </thead>
            <tbody>
                {projects.map((project) => {
                    return (
                        <tr key={project.slug}>
                            {createCell(project.title)}
                            {createCell(project.description)}
                            {createCell(project.manager)}
                            {createCell(project.open_tickets)}
                            {createCell(project.created)}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ProjectListView;
