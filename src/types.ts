// Project-related types

export interface Team {
    title: string,
    slug: string,
    description: string,
    created: string,
    memberships: TeamMembership[],
    projects_list: string,
    url: string,
    user_is_admin: boolean,
    admins: string[],
}

export interface TeamMembership {
    user: string,
    role: number,
    role_name: string,
}

export interface TeamInvitation {
    id: string,
    status_name: string,
    team: string,
    team_title: string,
    invitee?: string,
    invitee_email: string,
    inviter?: string,
    message_text: string,
    created: string,
    modified: string,
}

export interface NewTeamProps {
    title: string,
    description: string,
}

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
    user_permissions: ProjectUserPermissions
}

export interface ProjectUserPermissions {
    view: boolean,
    edit: boolean,
    update_manager: boolean,
    create_tickets: boolean,
    assign_developer: boolean,
}

export interface NewOrUpdatedProjectProps {
    title: string;
    description: string;
    manager?: string;
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
    user_permissions: TicketUserPermissions
}

export interface TicketUserPermissions {
    view: boolean,
    edit: boolean,
    change_developer: boolean,
    delete: boolean,
    close: boolean,
}

export interface Comment {
    user: string,
    ticket: string,
    text: string,
    created: string,
}

export interface NewOrUpdatedTicketProps {
    title: string;
    description?: string;
    developer?: string;
    priority: number;
    resolution?: string;
}
