import React from 'react';

// Interface imports
import { Ticket } from '../../types';

// internal imports
import TicketTable from './TicketTable';
import TicketFilter from './TicketFilter';

interface TicketTableContainerProps {
    tickets: Ticket[];
}

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
        <div className="container">
            <div className="block">
                <h1 className="title is-2 has-text-grey-dark mt-3">{viewingClosed ? 'Closed Tickets' : 'Open Tickets'}</h1>
            </div>
            <div className="block">
                <TicketFilter
                    title={title}
                    handleTitleChange={handleTitleChange}
                    handleFilterReset={handleFilterReset}
                    viewingClosed={viewingClosed}
                    handleViewingClosedChange={handleViewingClosedChange}
                />
            </div>
            <div className="block">
                <TicketTable tickets={filteredTickets} />
            </div>
        </div>
    );
};

export default TicketTableContainer;
