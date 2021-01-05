// Project-related types

export interface Project {
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
