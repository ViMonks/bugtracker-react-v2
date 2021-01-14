import React from 'react';
import toast from 'react-hot-toast';
import ticketList from '../../fakeAPI/ticketList';
import projectDetail from '../../fakeAPI/projectDetail';
import teamDetail from '../../fakeAPI/teamDetail';
import { useParams } from 'react-router-dom';

// interfaces
import { Project, Ticket, NewOrUpdatedTicketProps, Team } from '../../types';

import ProjectDetailView from './ProjectDetailView';
import TeamContext from '../context/TeamContext';

interface ParamTypes {
    teamSlug: string;
}

const ProjectDetailContainer = (props: any): React.ReactElement => {
    const getTickets = (projectSlug: string): Ticket[] => {
        // TODO: this is where the API call will live; will have to take in the projectSlug parameter; it's available at `props.match.params.projectSlug`
        return ticketList;
    };

    const getProject = (projectSlug: string): Project => {
        // TODO: this is where the projectdetail api call lives; will need the projectSlug parameter; it's available at `props.match.params.projectSlug`
        console.log({ projectSlug });
        return projectDetail;
    };

    const createTicket = (newTicket: NewOrUpdatedTicketProps): void => {
        // TODO: the API call to create a new ticket will live here
        // TODO: use react-router history.push and useHistory() hook to navigate to the ticket detail page after ticket creation
        console.log(newTicket);
        toast.success('Ticket created successfully!'); // TODO: can map a Promise to a toast to have the toast update based on the Promise, like when fetching data. See implementation in docs: https://react-hot-toast.com/docs/toast
    };

    const getTeam = (teamSlug: string): Team => {
        // TODO: API call to get team based on current URL
        return teamDetail;
    };
    const { teamSlug } = useParams<ParamTypes>();
    const [team, setTeam] = React.useState(getTeam(teamSlug));
    React.useEffect(() => {
        setTeam(getTeam(teamSlug));
    }, [teamSlug]);

    const projectSlug = props.match.params.projectSlug;

    return (
        <TeamContext.Provider value={team}>
            <ProjectDetailView
                tickets={getTickets(projectSlug)}
                project={getProject(projectSlug)}
                createTicket={createTicket}
            />
        </TeamContext.Provider>
    );
};

export default ProjectDetailContainer;
