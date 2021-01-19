import React from 'react';

// Interface imports
import { Project, ProjectMembership } from '../../types';

// Internal imports
import { createLinkCell, createHeader, createCell, createDateCell } from '../utils';
import ProjectTableRow from './ProjectTableRow'

interface ProjectTableProps {
    projects: Project[];
}

const ProjectTable: React.FunctionComponent<ProjectTableProps> = ({
    projects,
}: ProjectTableProps): React.ReactElement => {
    const headers: string[] = ['Title', 'Description', 'Manager', 'Open Tickets', 'Created'];

    return (
        <table className="table shadow-lg mt-1 w-full text-left">
            <thead>
                <tr>{headers.map((header: string, index: number) => createHeader(header, index.toString()))}</tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectTableRow key={project.slug} project={project} />)}
            </tbody>
        </table>
    );
};

export default ProjectTable;
