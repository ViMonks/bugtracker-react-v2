import React from 'react';
// import { useQueryClient } from 'react-query';
// import { useParams } from 'react-router-dom';

// Interface imports
import { Ticket } from '../../types';

// Internal imports
import {
    createLinkCell,
    createCell,
    createDateCell,
    createElapsedTimeCell,
    getPriorityText,
} from '../utils';
// import { getTicketDetails } from '../API/FirebaseAPI';

interface TicketTableRowProps {
    ticket: Ticket;
}

// interface ParamTypes {
//     teamSlug: string;
//     projectSlug: string;
// }

export default function TicketTableRow({ ticket, }: TicketTableRowProps): React.ReactElement {
    // const queryClient = useQueryClient();
    // const { teamSlug, projectSlug } = useParams<ParamTypes>();
    // const ticketSlug = ticket.slug;

    // disabling PREFETCH for now
    // const prefetchTicketDetails = async () => {
    //     await queryClient.prefetchQuery(
    //         ['ticketDetails', { teamSlug }],
    //         () => getTicketDetails({ teamSlug, projectSlug, ticketSlug }),
    //         { staleTime: Infinity },
    //     );
    // };

    // React.useEffect(() => {
    //     prefetchTicketDetails();
    // });

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
