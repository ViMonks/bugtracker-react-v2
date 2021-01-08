import React from 'react';

// Interface imports
import { Project, ProjectMembership } from '../../types';

// Internal imports
import { createLinkCell, createHeader, createCell, createDateCell } from '../utils';

interface ProjectTableProps {
    projects: Project[];
}

const ProjectTable: React.FunctionComponent<ProjectTableProps> = ({
    projects,
}: ProjectTableProps): React.ReactElement => {
    const headers: string[] = ['Title', 'Description', 'Manager', 'Open Tickets', 'Created'];

    return (
        <table className="shadow-lg mt-1 w-full text-left">
            <thead>
                <tr>{headers.map((header: string, index: number) => createHeader(header, index.toString()))}</tr>
            </thead>
            <tbody>
                {projects.map((project) => {
                    return (
                        <tr key={project.slug}>
                            {createLinkCell(project.title, `/projects/${project.slug}`)}
                            {createCell(project.description)}
                            {createCell(project.manager)}
                            {createCell(project.open_tickets)}
                            {createDateCell(project.created)}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default ProjectTable;
