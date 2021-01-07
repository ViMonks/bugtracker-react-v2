import React from 'react';

// Interface imports
import { Project, ProjectMembership, Ticket, Comment } from '../../types';

interface TicketTableProps {
    tickets: Ticket[]
}

const TicketTable: React.FunctionComponent<TicketTableProps> = ({
    tickets,
}: TicketTableProps): React.ReactElement => {
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

    const getPriorityText = (priority: number): string => {
        if (priority === 1) {
            return "Low"
        } else if (priority === 2) {
            return "High"
        } else {
            return "Urgent"
        }
    }

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
                            {createCell(ticket.title)}
                            {createCell(ticket.user)}
                            {ticket.developer ? createCell(ticket.developer) : createCell('')}
                            {createCell(getPriorityText(ticket.priority))}
                            {createDateCell(ticket.created)}
                            {createDateCell(ticket.modified)}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TicketTable;
