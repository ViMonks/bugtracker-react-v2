// Project-related types

export interface Project {
    title: string,    
    slug: string,
    description: string,
    team: string,
    is_archived: boolean,
    manager: string | null,
    memberships: ProjectMembership[],
    created: string,
    modified: string,
    url: string,
    tickets_list: string,
    open_tickets: number
}

export interface ProjectMembership {
    user: string,
    role: number,
    role_name: string,
}

export interface Ticket {
    title: string,
    slug: string,
    description: string,
    priority: number,
    user: string,
    project: number,
    resolution?: string,
    developer?: string,
    is_open: boolean,
    created: string,
    modified: string,
    url: string,
    comments: Comment[],
}

export interface Comment {
    user: string,
    ticket: string,
    text: string,
    created: string,
}