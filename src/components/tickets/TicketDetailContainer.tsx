import React from 'react';
import toast from 'react-hot-toast'
import ticketDetail from '../../fakeAPI/ticketDetail';
import projectDetail from '../../fakeAPI/projectDetail'

// interfaces
import { NewOrUpdatedTicketProps, Ticket, Project } from '../../types';

import TicketDetailView from './TicketDetailView';

const TicketDetailContainer = (props: any): React.ReactElement => {
    const getTicket = (ticketSlug: string): Ticket => {
        // TODO: this is where the TicketDetail API call will live. Will need the ticketSlug and projectSlug parameter, available at `props.match.params`
        // update: a better option for accessing the slug is the useParams() hook from React Router
        // make sure to define the types: interface ParamTypes { projectSlug: string }, then call const { projectSlug } = useParams();
        // see TicketDetailClosingModal for an implementation
        console.log({ ticketSlug });
        console.log({ projectSlug });
        return ticketDetail;
    };

    const getProject = (projectSlug: string): Project => {
        // TODO: this is where the API call to get the ticket's associated project will live
        console.log({ projectSlug });
        return projectDetail;
    };

    const closeTicket = (ticketSlug: string): void => {        
        console.log(`Closing ticket ${ticketSlug}`)
        toast.success('Ticket closed!') // implementation with Promises: https://react-hot-toast.com/docs/toast
        // TODO: the API call to close the current ticket will be made here
    }

    const updateTicket = (updatedTicket: NewOrUpdatedTicketProps):void => {
        console.log(`Updating ticket ${ticketSlug}`)
        console.log(updatedTicket)
        toast.success('Ticket updated!')
        // TODO: the API call to update the current ticket will live here
        // TODO: will have to figure out how to re-render the TicketDetailContainer when this happens so the updated version of the ticket is fetched
    }

    const projectSlug = props.match.params.projectSlug;
    const ticketSlug = props.match.params.ticketSlug;

    return <TicketDetailView ticket={getTicket(ticketSlug)} closeTicket={closeTicket} updateTicket={updateTicket} project={getProject(projectSlug)} />;
};

export default TicketDetailContainer;
