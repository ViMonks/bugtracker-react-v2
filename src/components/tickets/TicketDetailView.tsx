import React from 'react';

// interfaces
import { Ticket } from '../../types';

// internal imports
import CommentList from './CommentList';
import { getPriorityText, getLastUpdatedString } from '../utils';
import projectList from '../../fakeAPI/projectList';
import { Z_BLOCK } from 'zlib';

interface TicketDetailViewProps {
    ticket: Ticket;
}

interface TicketDetailPaneProps {
    ticket: Ticket;
}

const TicketDetailView: React.FunctionComponent<TicketDetailViewProps> = ({
    ticket,
}: TicketDetailViewProps): React.ReactElement => {
    return (
        <div className="container mt-4">
            <div className="columns">
                <div className="column">
                    <TicketDetailPane ticket={ticket} />
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
}: TicketDetailPaneProps): React.ReactElement => {
    const { title, description, user, priority, is_open, created, modified } = ticket;

    const createParagraphElement = (value: string) => {
        return <p className="pt-1 text-gray-700">{value}</p>;
    };

    return (
        <div className="panel is-info">
            <p className="panel-heading">{title}</p>
            {description && <p className="panel-block">{description}</p>}
            <p className="panel-block">{`Submitted by ${user}`}</p>
            <p className="panel-block">{`Priority: ${getPriorityText(priority)}`}</p>
            <p className="panel-block">{is_open ? 'Status: open' : 'Status: closed'}</p>
            <p className="panel-block">{`Submitted on ${new Date(created).toLocaleDateString()}`}</p>
            <p className="panel-block">{`Last updated ${getLastUpdatedString(modified)}`}</p>
            <div className="panel-block">
                <button className="button is-warning">{is_open ? 'Close ticket' : 'Reopen ticket'}</button>
            </div>
        </div>
    );
};
// TODO: implement ticket closing

export default TicketDetailView;
