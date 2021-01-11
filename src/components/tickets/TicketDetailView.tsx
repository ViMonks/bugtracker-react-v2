import React from 'react';

// interfaces
import { Ticket } from '../../types';

// internal imports
import CommentList from './CommentList';
import { getPriorityText, getLastUpdatedString } from '../utils';
import projectList from '../../fakeAPI/projectList';
import TicketDetailClosingModal from './TicketDetailClosingModal'

interface TicketDetailViewProps {
    ticket: Ticket;
    closeTicket: (ticketSlug: string) => void;
}

interface TicketDetailPaneProps {
    ticket: Ticket;
    closeTicket: (ticketSlug: string) => void;
}

const TicketDetailView: React.FunctionComponent<TicketDetailViewProps> = ({
    ticket,
    closeTicket,
}: TicketDetailViewProps): React.ReactElement => {
    return (
        <div className="container mt-4">
            <div className="columns">
                <div className="column">
                    <TicketDetailPane ticket={ticket} closeTicket={closeTicket} />
                </div>
                <div className="column">
                    <CommentList comments={ticket.comments} />
                </div>
            </div>
        </div>
    );
};

const TicketDetailPane: React.FunctionComponent<TicketDetailPaneProps> = ({
    ticket,
    closeTicket,
}: TicketDetailPaneProps): React.ReactElement => {
    const { title, description, user, priority, is_open, created, modified, resolution } = ticket;

    return (
        <div className="panel is-info">
            <p className="panel-heading">{title}</p>
            {description && <p className="panel-block">{description}</p>}
            <p className="panel-block">{`Submitted by ${user}`}</p>
            <p className="panel-block">{`Priority: ${getPriorityText(priority)}`}</p>
            <p className="panel-block">{is_open ? 'Status: open' : 'Status: closed'}</p>
            <p className="panel-block">{`Submitted on ${new Date(created).toLocaleDateString()}`}</p>
            <p className="panel-block">{`Last updated ${getLastUpdatedString(modified)}`}</p>
            <TicketDetailClosingModal isOpen={is_open} resolution={resolution} closeTicket={closeTicket}/>
        </div>
    );
};

export default TicketDetailView;
