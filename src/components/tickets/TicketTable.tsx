import React from 'react';

// Interface imports
import { Ticket } from '../../types';

// Internal imports
import TicketTableRow from './TicketTableRow';
import { createHeader } from '../utils';

interface TicketTableProps {
    tickets: Ticket[];
}

const TicketTable: React.FunctionComponent<TicketTableProps> = ({ tickets }: TicketTableProps): React.ReactElement => {
    const headers: string[] = ['Title', 'User', 'Developer', 'Priority', 'Created', 'Updated'];

    return (
        <table className="table shadow-lg mt-1 w-full text-left">
            <thead>
                <tr>{headers.map((header: string, index: number) => createHeader(header, index.toString()))}</tr>
            </thead>
            <tbody>
                {tickets.map((ticket) => (
                    <TicketTableRow key={ticket.slug} ticket={ticket} />
                ))}
            </tbody>
        </table>
    );
};

export default TicketTable;
