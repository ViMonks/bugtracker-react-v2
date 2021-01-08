import React from 'react';
import ticketDetail from '../../fakeAPI/ticketDetail';

// interfaces
import { Ticket } from '../../types';

import TicketDetailView from './TicketDetailView';

const TicketDetailContainer = (props: any): React.ReactElement => {
    const getTicket = (ticketSlug: string): Ticket => {
        // TODO: this is where the TicketDetail API call will live. Will need the ticketSlug and projectSlug parameter, available at `props.match.params`
        console.log({ ticketSlug });
        console.log({ projectSlug });
        return ticketDetail;
    };

    const projectSlug = props.match.params.projectSlug;
    const ticketSlug = props.match.params.ticketSlug;

    return <TicketDetailView ticket={getTicket(ticketSlug)} />;
};

export default TicketDetailContainer;
