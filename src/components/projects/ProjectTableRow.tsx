import React from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

// Interface imports
import { Project } from '../../types';
import { useAuth } from '../context/AuthContext';

// Internal imports
import { createLinkCell, createCell, createDateCell } from '../utils';
import { getProjectDetails, getTicketList } from '../API/Api';

interface ProjectTableRowProps {
    project: Project;
}

interface ParamTypes {
    teamSlug: string;
}

export default function ProjectTableRow({ project }: ProjectTableRowProps): React.ReactElement {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { teamSlug } = useParams<ParamTypes>();
    const projectSlug = project.slug;

    const prefetchTicketList = async () => {
        await user;
        await queryClient.prefetchQuery(
            ['ticketList', { user, teamSlug, projectSlug }],
            () => getTicketList({ user, teamSlug, projectSlug }),
            { staleTime: Infinity },
        );
    };

    const prefetchProjectDetails = async () => {
        await user;
        await queryClient.prefetchQuery(
            ['projectDetails', { user, teamSlug, projectSlug }],
            () => getProjectDetails({ user, teamSlug, projectSlug }),
            { staleTime: Infinity },
        );
    };

    React.useEffect(() => {
        prefetchProjectDetails()
        prefetchTicketList()
    })

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
