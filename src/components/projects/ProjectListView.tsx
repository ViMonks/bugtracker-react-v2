import React from 'react'
import { useTable } from 'react-table'
import projectList from '../../fakeAPI/projectList'

interface ProjectType {
    title: string,    
    slug: string,
    description: string,
    team: string,
    is_archived: boolean,
    manager: string | null,
    memberships: Array<unknown>,
    created: string,
    modified: string,
    url: string,
    tickets_list: string,
    open_tickets: number
}

interface ProjectTableProps {
    projects: Array<ProjectType>
}

const ProjectListView = () => {
    return (
        <div className="container mx-auto py-4 px-2">
            <h1 className="text-5xl text-gray-800 text-left">Projects</h1>
            <ProjectFilter />
            <ProjectTable projects={projectList} />
        </div>
    )
}

const ProjectFilter = () => {
    return (
        <div className="container border-gray-800 rounded-sm border mt-3 shadow-md bg-gray-100">
                <div className="flex md:flex-row flex-col my-2">
                    <div className="flex-auto text-left md:text-center">
                        {/* <label className="text-lg" htmlFor="title">Title:</label> */}
                        <label className="text-2xl" htmlFor="title">Title:</label>
                        <input className="mx-1 border rounded-sm focus:ring-2 outline-none" type="text" id="title"/>
                    </div>
                    <div className="flex-auto text-left md:text-center">
                        <label className="text-2xl" htmlFor="start-date">Start date:</label>
                        <input className="mx-1 border rounded-sm focus:ring-2 outline-none" type="date" id="start-date"/>
                    </div>
                    <div className="flex-auto text-left md:text-center">
                        <label className="text-2xl" htmlFor="end-date">End date:</label>
                        <input className="mx-1 border rounded-sm focus:ring-2 outline-none" type="date" id="end-date"/>
                    </div>
                    <div className="flex-auto text-left md:text-center">
                        <label className="text-2xl" htmlFor="manager">Manager:</label>
                        <select name="manager" id="manager" className="mx-1 border rounded-sm focus:ring-2 outline-none">
                            <option value=""></option>
                            <option value="manager-1">Manager 1</option>
                            <option value="manager-2">Manager 2</option>
                            <option value="manager-3">Manager 3</option>
                        </select>
                    </div>
                </div>
            </div>
    )
}

const ProjectTable: React.FunctionComponent<ProjectTableProps> = (props: ProjectTableProps): React.ReactElement => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Manager</th>
                    <th>Open Ticket</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>
                {props.projects.map((project) => {
                    return (
                        <tr key={project.slug}>
                            <td>{project.title}</td>
                            <td>{project.description}</td>
                            <td>{project.manager}</td>
                            <td>{project.open_tickets}</td>
                            <td>{project.created}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ProjectListView
