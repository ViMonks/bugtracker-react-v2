import React from 'react';

// interfaces
import { Ticket } from '../../types';

// internal imports
import CommentList from './CommentList';
import { getPriorityText, getLastUpdatedString } from '../utils';

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
        <div className="container mx-auto py-4 md:px-20">
            <div className="grid grid-cols-2">
                <div className="col-span-1 text-left">
                    <TicketDetailPane ticket={ticket} />
                </div>
                <div className="col-span-1 text-left">
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
        <div className="">
            <h1 className="text-2xl text-blue-800 text-left">{title}</h1>
            {description && <p className="leading-relaxed pt-4 text-gray-700">{description}</p>}
            {createParagraphElement(`Submitted by ${user}`)}
            {createParagraphElement(`Priority: ${getPriorityText(priority)}`)}
            {createParagraphElement(is_open ? 'Status: open' : 'Status: closed')}
            {createParagraphElement(`Submitted on ${new Date(created).toLocaleDateString()}`)}
            {createParagraphElement(`Last updated ${getLastUpdatedString(modified)}`)}
        </div>
    );
};

export default TicketDetailView;
