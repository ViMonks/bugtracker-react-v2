import React from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

// Interface imports
import { Project } from '../../types';
import { useAuth } from '../context/AuthContext';

// Internal imports
import { createLinkCell, createCell, createDateCell } from '../utils';
import { getProjectDetails, getTicketList } from '../API/FirebaseAPI';

interface ProjectTableRowProps {
    project: Project;
}

interface ParamTypes {
    teamSlug: string;
}

export default function ProjectTableRow({ project }: ProjectTableRowProps): React.ReactElement {
    const queryClient = useQueryClient();
    const { teamSlug } = useParams<ParamTypes>();
    const projectSlug = project.slug;

    // disabling PREFETCH for now
    // const prefetchTicketList = async () => {
    //     await queryClient.prefetchQuery(
    //         ['ticketList', { teamSlug, projectSlug }],
    //         () => getTicketList({ teamSlug, projectSlug }),
    //         { staleTime: Infinity },
    //     );
    // };

    // const prefetchProjectDetails = async () => {
    //     await queryClient.prefetchQuery(
    //         ['projectDetails', { teamSlug, projectSlug }],
    //         () => getProjectDetails({ teamSlug, projectSlug }),
    //         { staleTime: Infinity },
    //     );
    // };

    // React.useEffect(() => {
    //     prefetchProjectDetails()
    //     prefetchTicketList()
    // })

    return (
        <tr key={project.slug}>
            {createLinkCell(project.title, `${project.slug}`)}
            {createCell(project.description)}
            {createCell(project.manager)}
            {createCell(project.open_tickets)}
            {createDateCell(project.created)}
        </tr>
    );
}
