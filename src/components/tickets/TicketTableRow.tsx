import React from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

// Interface imports
import { Ticket } from '../../types';
import { useAuth } from '../context/AuthContext';

// Internal imports
import {
    createLinkCell,
    createCell,
    createDateCell,
    createElapsedTimeCell,
    getPriorityText,
} from '../utils';
import { getTicketDetails } from '../API/FirebaseAPI';

interface TicketTableRowProps {
    ticket: Ticket;
}

interface ParamTypes {
    teamSlug: string;
    projectSlug: string;
}

export default function TicketTableRow({ ticket, }: TicketTableRowProps): React.ReactElement {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { teamSlug, projectSlug } = useParams<ParamTypes>();
    const ticketSlug = ticket.slug;

    const prefetchTicketDetails = async () => {
        await user;
        await queryClient.prefetchQuery(
            ['ticketDetails', { user, teamSlug }],
            () => getTicketDetails({ user, teamSlug, projectSlug, ticketSlug }),
            { staleTime: Infinity },
        );
    };

    React.useEffect(() => {
        prefetchTicketDetails();
    });

    return (
        <tr key={ticket.slug}>
            {createLinkCell(ticket.title, `tickets/${ticket.slug}`)}
            {createCell(ticket.user)}
            {ticket.developer ? createCell(ticket.developer) : createCell('')}
            {createCell(getPriorityText(ticket.priority))}
            {createDateCell(ticket.created)}
            {createElapsedTimeCell(ticket.modified)}
        </tr>
    );
}
