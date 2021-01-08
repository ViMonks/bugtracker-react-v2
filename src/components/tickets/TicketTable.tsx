import React from 'react';
import { useRouteMatch } from 'react-router-dom';

// Interface imports
import { Project, ProjectMembership, Ticket, Comment } from '../../types';

// Internal imports
import {
    createLinkCell,
    createHeader,
    createCell,
    createDateCell,
    createElapsedTimeCell,
    getPriorityText,
} from '../utils';

interface TicketTableProps {
    tickets: Ticket[];
}

const TicketTable: React.FunctionComponent<TicketTableProps> = ({ tickets }: TicketTableProps): React.ReactElement => {
    const { url } = useRouteMatch();

    const headers: string[] = ['Title', 'User', 'Developer', 'Priority', 'Created', 'Updated'];

    return (
        <table className="shadow-lg mt-1 w-full text-left">
            <thead>
                <tr>{headers.map((header: string, index: number) => createHeader(header, index.toString()))}</tr>
            </thead>
            <tbody>
                {tickets.map((ticket) => {
                    return (
                        <tr key={ticket.slug}>
                            {createLinkCell(ticket.title, `${url}/tickets/${ticket.slug}`)}
                            {/* {createCell(ticket.title)} */}
                            {createCell(ticket.user)}
                            {ticket.developer ? createCell(ticket.developer) : createCell('')}
                            {createCell(getPriorityText(ticket.priority))}
                            {createDateCell(ticket.created)}
                            {createElapsedTimeCell(ticket.modified)}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TicketTable;
