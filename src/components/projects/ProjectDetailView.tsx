import React from 'react';

// Interface imports
import { Project, ProjectMembership, Ticket, Comment } from '../../types';

import TicketTable from '../tickets/TicketTable';

interface ProjectDetailViewProps {
    project: Project;
    tickets: Ticket[];
}

interface ProjectDetailPaneProps {
    project: Project;
}

interface TicketTableContainerProps {
    tickets: Ticket[];
}

interface TicketFilterProps {
    title: string;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    viewingClosed: boolean;
    handleViewingClosedChange: () => void;
    handleFilterReset: () => void;
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
            <p className="text-gray-700 pt-1">
                <strong>Assigned developers: </strong>
            </p>{' '}
            {/* TODO: implement developer iteration */}
            <p className="text-gray-700 pt-1">Created: {new Date(created).toLocaleDateString()}</p>
        </div>
    );
};

const TicketTableContainer: React.FunctionComponent<TicketTableContainerProps> = ({
    tickets,
}: TicketTableContainerProps): React.ReactElement => {
    const [title, setTitle] = React.useState('');
    const [viewingClosed, setViewingClosed] = React.useState(false);
    const [filteredTickets, setFilteredTickets] = React.useState(tickets);

    // callback functions to handle filter changes
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const element = e.target as HTMLInputElement;
        setTitle(element.value);
    };

    const handleViewingClosedChange = (): void => {
        setViewingClosed(!viewingClosed);
    };

    const handleFilterReset = (): void => {
        setTitle('');
    };

    // Filters ticket array based on values from TicketFilter element
    const filterTickets = (tickets: Ticket[]): Ticket[] => {
        const filteredTickets: Ticket[] = [];
        tickets.forEach((ticket) => {
            const titleMatches = ticket.title.toLowerCase().indexOf(title.toLowerCase()) !== -1;
            const viewingClosedMatches = !ticket.is_open === viewingClosed;
            const allFiltersMatch = titleMatches && viewingClosedMatches;
            if (allFiltersMatch) {
                filteredTickets.push(ticket);
            }
        });
        return filteredTickets;
    };

    // calls filterTickets when state changes based on input values from TicketFilter, then sets the newly filtered tickets to state
    React.useEffect(() => {
        setFilteredTickets(filterTickets(tickets));
    }, [title, viewingClosed]);

    return (
        <div>
            <h1 className="text-5xl text-blue-800 text-left">{viewingClosed ? 'Closed Tickets' : 'Open Tickets'}</h1>
            <TicketFilter
                title={title}
                handleTitleChange={handleTitleChange}
                handleFilterReset={handleFilterReset}
                viewingClosed={viewingClosed}
                handleViewingClosedChange={handleViewingClosedChange}
            />
            <TicketTable tickets={filteredTickets} />
        </div>
    );
};

const TicketFilter: React.FunctionComponent<TicketFilterProps> = ({
    title,
    handleTitleChange,
    handleFilterReset,
    viewingClosed,
    handleViewingClosedChange,
}: TicketFilterProps): React.ReactElement => {
    return (
        <div className="container shadow bg-gray-200 mt-3">
            <input
                className="my-1 mx-1 border rounded-md focus:ring-2 outline-none bg-gray-300 text-gray-700 p-1"
                placeholder="Title search"
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
            />
            <button
                className="text-l text-gray-800 bg-gray-300 hover:bg-gray-400 border border-gray-800 px-2 rounded-sm mt-1 mx-2"
                onClick={handleFilterReset}
            >
                Reset
            </button>
            <button
                className="text-l text-gray-800 bg-blue-300 hover:bg-blue-400 border border-blue-800 px-2 rounded-sm mt-1 mx-1"
                onClick={handleViewingClosedChange}
            >
                {viewingClosed ? 'View open' : 'View closed'}
            </button>
        </div>
    );
};

export default ProjectDetailView;
