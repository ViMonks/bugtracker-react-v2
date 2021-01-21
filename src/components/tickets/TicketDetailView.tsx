import React from 'react';

// interfaces
import { Ticket, NewOrUpdatedTicketProps, Project } from '../../types';

// internal imports
import CommentList from './CommentList';
import { getPriorityText, getLastUpdatedString } from '../utils';
import projectList from '../../fakeAPI/projectList';
import TicketDetailClosingModal from './TicketDetailClosingModal';
import UpdateTicketModalForm from './UpdateTicketModalForm'

interface TicketDetailViewProps {
    ticket: Ticket;
    handleCloseTicket: (ticketSlug: string, resolutionState?: string) => void;
    updateTicket: (updatedTicket: NewOrUpdatedTicketProps) => void;
}

interface TicketDetailPaneProps {
    ticket: Ticket;
    handleCloseTicket: (ticketSlug: string, resolutionState?: string) => void;
    updateTicket: (updatedTicket: NewOrUpdatedTicketProps) => void;
}

const TicketDetailView: React.FunctionComponent<TicketDetailViewProps> = ({
    ticket,
    handleCloseTicket,
    updateTicket,
}: TicketDetailViewProps): React.ReactElement => {
    return (
        <div className="container mt-4">
            <div className="columns">
                <div className="column">
                    <TicketDetailPane ticket={ticket} updateTicket={updateTicket} handleCloseTicket={handleCloseTicket} />
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
    handleCloseTicket,
    updateTicket,
}: TicketDetailPaneProps): React.ReactElement => {
    const { title, description, user, priority, is_open, created, modified, resolution, developer } = ticket;

    return (
        <div className="panel is-info">
            <p className="panel-heading">{title}</p>
            {description && <p className="panel-block">{description}</p>}
            <p className="panel-block">{`Submitted by ${user}`}</p>
            <p className="panel-block">{`Priority: ${getPriorityText(priority)}`}</p>
            <p className="panel-block">{is_open ? 'Status: open' : 'Status: closed'}</p>
            <p className="panel-block">{`Submitted on ${new Date(created).toLocaleDateString()}`}</p>
            <p className="panel-block">{`Last updated ${getLastUpdatedString(modified)}`}</p>
            {developer && <p className="panel-block"><strong>Assigned to {developer}</strong></p>}
            <nav className="level">
                <div className="level-left">
                    <div className="level-item ml-3">
                        <UpdateTicketModalForm ticket={ticket} updateTicket={updateTicket} />
                    </div>
                    <div className="level-item">
                        <TicketDetailClosingModal isOpen={is_open} resolution={resolution} handleCloseTicket={handleCloseTicket} />
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default TicketDetailView;
